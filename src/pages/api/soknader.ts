import { NextApiHandler } from "next";
import { withSentry } from "@sentry/nextjs";
import { getSession } from "../../lib/auth.utils";
import { fetchInnsynAPI } from "../../lib/api/innsyn";
import { innsynAudience } from "../../lib/audience";

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
  endreLenke?: string;
  erNySøknadsdialog?: boolean;
}

export async function hentSoknader(token: Promise<string>): Promise<any> {
  return fetchInnsynAPI(token, `soknad`);
}

export const handleSøknad: NextApiHandler<Søknad[]> = async (req, res) => {
  const session = await getSession(req);
  if (!session.token) return res.status(401).end();

  return hentSoknader(session.apiToken(innsynAudience)).then(res.json);
};

export default withSentry(handleSøknad);
