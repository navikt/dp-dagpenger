import { gql, GraphQLClient } from "graphql-request";
import { Query } from "../saf";
import { v4 as uuidv4 } from "uuid";
import { logger } from "@navikt/next-logger";

const endpoint = `${process.env.SAF_SELVBETJENING_INGRESS}/graphql`;

export async function hentDokumentOversikt(
  token: string,
  fnr: string
): Promise<Pick<Query, "dokumentoversiktSelvbetjening">> {
  const callId = uuidv4();
  const variables = { fnr };

  const query = gql`
    query dokumentoversiktSelvbetjening($fnr: String!) {
      dokumentoversiktSelvbetjening(ident: $fnr, tema: [DAG, OPP]) {
        journalposter {
          journalpostId
          tema
          tittel
          relevanteDatoer {
            dato
            datotype
          }
          avsender {
            id
            type
          }
          mottaker {
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
  `;

  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Nav-Callid": callId,
      "Nav-Consumer-Id": "dp-dagpenger",
    },
  });

  try {
    logger.info(`Henter dokumenter med call-id: ${callId}`);
    return await client.request(query, variables);
  } catch (error) {
    logger.error(`Feil fra SAF med call-id ${callId}: ${error}`);
    throw error;
  }
}
