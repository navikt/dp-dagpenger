import { v4 as uuid } from "uuid";
import { NextApiHandler } from "next";
import { withSentry } from "@sentry/nextjs";
import { getSession } from "@navikt/dp-auth/server";

export type SøknadsKanal = "Papir" | "Digital";
export type SøknadsType = "NySøknad" | "Gjenopptak";

export interface Søknad {
  tittel?: string;
  søknadId?: string;
  skjemaKode?: string;
  journalpostId: string;
  søknadsType: SøknadsType;
  kanal: SøknadsKanal;
  datoInnsendt: string;
  vedlegg?: any[];
}

async function getApiData(token: string, endpoint: string): Promise<any> {
  const callId = uuid();

  console.log(`callId (${callId}) - Henter ${endpoint} fra innsyn.`);

  return fetch(`${process.env.INNSYN_API}/${endpoint}`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(async (res) => {
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError(
          `callId (${callId}) - Fikk ikke JSON fra innsyn. Body: ${await res.text()}.`
        );
      }
      console.log(`callId (${callId}) - Fikk svar fra innsyn`);
      return res;
    })
    .then((data) => data.json())
    .catch((err) =>
      console.error(
        `callId (${callId}) - Kunne ikke hente ${endpoint} fra innsyn. Feilmelding: ${err}`
      )
    );
}

export async function hentSøknad(token: string): Promise<any[]> {
  return getApiData(token, `soknad`);
}

export const handleSøknad: NextApiHandler<Søknad[]> = async (req, res) => {
  const { token, apiToken } = await getSession({ req });
  if (!token) return res.status(401).end();

  const audience = `${process.env.NAIS_CLUSTER_NAME}:teamdagpenger:dp-innsyn`;

  res.json(await hentSøknad(await apiToken(audience)));
};

export default withSentry(handleSøknad);
