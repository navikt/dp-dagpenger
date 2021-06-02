import { NextApiResponse } from "next";
import { gql, GraphQLClient } from "graphql-request";
import { v4 as uuidv4 } from "uuid";
import {
  AuthedNextApiRequest,
  withMiddleware,
} from "../../../auth/middlewares";
import { Query } from "../../../saf";

const endpoint = `${process.env.SAF_SELVBETJENING_INGRESS}/graphql`;
const audience = `${process.env.SAF_SELVBETJENING_CLUSTER}:teamdokumenthandtering:safselvbetjening`;

export type Journalpost = {
  journalpostId: string;
  tittel: string;
  tema: string;
  dokumenter: [
    {
      id: string;
      tittel: string;
    }
  ];
};

async function hentDokumenter(
  token: string,
  fnr: string
): Promise<Pick<Query, "dokumentoversiktSelvbetjening">> {
  const callId = uuidv4();
  const variables = { fnr };

  const query = gql`
    query dokumentoversiktSelvbetjening($fnr: String!) {
      dokumentoversiktSelvbetjening(ident: $fnr, tema: [DAG, OPP]) {
        tema {
          kode
          journalposter {
            journalpostId
            tittel
            journalposttype
            journalstatus
            dokumenter {
              dokumentInfoId
              tittel
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
    ({ journalpostId, tittel, tema, dokumenter }) => ({
      id: journalpostId,
      tittel,
      tema,
      dokumenter: dokumenter.map(({ dokumentInfoId, tittel }) => ({
        id: dokumentInfoId,
        tittel,
      })),
    })
  );

  res.json(dokumenter);
}

export default withMiddleware(handleDokumenter);