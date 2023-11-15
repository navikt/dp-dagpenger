import { NextApiHandler } from "next";
import { fetchInnsynAPI } from "../../lib/api/innsyn";
import { innsynAudience } from "../../lib/audience";
import { getSession } from "../../lib/auth.utils";

export type SøknadsKanal = "Papir" | "Digital";
export type SøknadsType = "NySøknad" | "Gjenopptak";

/* eslint-disable  @typescript-eslint/no-explicit-any */
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
  const session = await getSession(req);
  if (!session.token) return res.status(401).end();

  return hentSoknader(session.apiToken(innsynAudience)).then(res.json);
};

export default handleSøknad;
