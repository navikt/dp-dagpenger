import { NextApiResponse } from "next";
import { gql, GraphQLClient } from "graphql-request";
import { v4 as uuidv4 } from "uuid";
import { AuthedNextApiRequest, withMiddleware } from "../../auth/middlewares";
import { Query } from "../../saf";

const endpoint = "https://safselvbetjening.dev-fss-pub.nais.io/graphql";

export type Dokument = {
  journalpostId: string;
  tittel: string;
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
  res: NextApiResponse<Dokument[]>
) {
  const user = req.user;
  if (!user) return res.status(401).end();
  const token = await user.tokenFor(
    "dev-fss:teamdokumenthandtering:safselvbetjening"
  );

  let journalposter;
  try {
    const {
      dokumentoversiktSelvbetjening: { tema },
    } = await hentDokumenter(token, user.fnr);
    journalposter = tema[0].journalposter;
  } catch (errors) {
    return res.status(500).send(errors);
  }

  const dokumenter = journalposter.map(({ journalpostId, tittel }) => ({
    id: journalpostId,
    tittel,
  }));

  res.status(200).json(dokumenter);
}

export default withMiddleware(handleDokumenter);
