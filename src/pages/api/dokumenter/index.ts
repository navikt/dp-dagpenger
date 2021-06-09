import { NextApiResponse } from "next";
import { gql, GraphQLClient } from "graphql-request";
import { v4 as uuidv4 } from "uuid";
import {
  AuthedNextApiRequest,
  withMiddleware,
} from "../../../auth/middlewares";
import { Datotype, Query } from "../../../saf";

const endpoint = `${process.env.SAF_SELVBETJENING_INGRESS}/graphql`;
const audience = `${process.env.SAF_SELVBETJENING_CLUSTER}:teamdokumenthandtering:safselvbetjening`;

export type Journalpost = {
  journalpostId: string;
  tittel: string;
  dato: string;
  tema: string;
  dokumenter: Dokument[];
};
export type Dokument = {
  id: string;
  tittel: string;
  links: Link[];
  type: DokumentType;
  brukerHarTilgang: boolean;
};
export type DokumentType = "Hoved" | "Vedlegg";
export type Link = { href: string; rel: LinkRel; type: LinkType };
export type LinkType = "GET" | "POST";
export type LinkRel = "preview";

async function hentDokumenter(
  token: string,
  fnr: string
): Promise<Pick<Query, "dokumentoversiktSelvbetjening">> {
  const callId = uuidv4();
  const variables = { fnr };

  const query = gql`
    query dokumentoversiktSelvbetjening($fnr: String!) {
      dokumentoversiktSelvbetjening(
        ident: $fnr
        tema: [DAG, OPP, SYK, SYM, KON]
      ) {
        tema {
          kode
          journalposter {
            journalpostId
            tittel
            relevanteDatoer {
              dato
              datotype
            }
            avsenderMottaker {
              id
              type
            }
            journalposttype
            journalstatus
            dokumenter {
              dokumentInfoId
              tittel
              dokumentvarianter {
                variantformat
                brukerHarTilgang
              }
            }
          }
        }
      }
    }
  `;

  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Nav-Callid": callId,
      "Nav-Consumer-Id": "dp-dagpenger",
    },
  });

  try {
    console.log(`Henter dokumenter med call-id: ${callId}`);
    return await client.request(query, variables);
  } catch (error) {
    console.error(`Feil fra SAF med call-id ${callId}: ${error}`);
    throw error;
  }
}

export async function handleDokumenter(
  req: AuthedNextApiRequest,
  res: NextApiResponse<Journalpost[]>
) {
  const user = req.user;
  if (!user) return res.status(401).end();
  const token = await user.tokenFor(audience);

  let journalposter;
  try {
    const {
      dokumentoversiktSelvbetjening: { tema },
    } = await hentDokumenter(token, user.fnr);
    journalposter = tema
      .map(({ kode: tema, journalposter }) => {
        return journalposter.map((journalpost) => ({ ...journalpost, tema }));
      })
      .flat(1);
  } catch (errors) {
    return res.status(500).send(errors);
  }

  const dokumenter: Journalpost[] = journalposter.map(
    ({ journalpostId, tittel, tema, dokumenter, relevanteDatoer, ...rest }) => {
      const { dato } = relevanteDatoer.find(
        (dato) => dato.datotype == Datotype.DatoOpprettet
      );

      return {
        id: journalpostId,
        tittel,
        dato,
        tema,
        ...rest,
        dokumenter: dokumenter.map(
          ({ dokumentInfoId, tittel, dokumentvarianter, ...rest }, index) => {
            // Første vedlegg er alltid hoveddokument
            const type = index == 0 ? "Hoved" : "Vedlegg";

            const erArkiv = (variant) => variant.variantformat === "ARKIV";
            const getArkivVariant = (dokVarianter) => {
              if (dokVarianter) return dokVarianter.find(erArkiv);
              return null;
            };

            const dokumentetKanVises = () => {
              const variant = getArkivVariant(dokumentvarianter);
              if (variant) return variant.brukerHarTilgang;
              return false;
            };

            return {
              id: dokumentInfoId,
              tittel,
              type,
              brukerHarTilgang: dokumentetKanVises(),
              ...rest,
              links: [
                {
                  href: `${process.env.NEXT_PUBLIC_BASE_PATH}/api/dokumenter/${journalpostId}/${dokumentInfoId}/forhandsvisning`,
                  rel: "preview",
                  type: "GET",
                },
              ],
            };
          }
        ),
      };
    }
  );

  res.json(dokumenter);
}

export default withMiddleware(handleDokumenter);
