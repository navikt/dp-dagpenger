import { NextApiHandler } from "next";
import { withSentry } from "@sentry/nextjs";
import { getSession } from "@navikt/dp-auth/server";
import { fetchInnsynAPI } from "../../lib/api/innsyn";

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

export async function hentSøknad(token: string): Promise<any[]> {
  return fetchInnsynAPI(token, `soknad`);
}

export const handleSøknad: NextApiHandler<Søknad[]> = async (req, res) => {
  const { token, apiToken } = await getSession({ req });
  if (!token) return res.status(401).end();

  const audience = `${process.env.NAIS_CLUSTER_NAME}:teamdagpenger:dp-innsyn`;

  res.json(await hentSøknad(await apiToken(audience)));
};

export default withSentry(handleSøknad);
