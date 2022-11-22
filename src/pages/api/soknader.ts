import { NextApiHandler } from "next";
import { withSentry } from "@sentry/nextjs";
import { getSession } from "../../lib/auth.utils";
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
  endreLenke: string;
  erNySøknadsdialog: boolean;
}

export async function hentSoknader(token: Promise<string>): Promise<any> {
  return fetchInnsynAPI(token, `soknad`);
}

export const handleSøknad: NextApiHandler<Søknad[]> = async (req, res) => {
  const { token, apiToken } = await getSession(req);
  if (!token) return res.status(401).end();

  const audience = `${process.env.NAIS_CLUSTER_NAME}:teamdagpenger:dp-innsyn`;

  return hentSoknader(apiToken(audience)).then(res.json);
};

export default withSentry(handleSøknad);
