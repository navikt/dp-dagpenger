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
}

export async function hentSoknader(
  apiToken: (audience: string) => Promise<string>
): Promise<any> {
  const token: Promise<string> =
    typeof apiToken !== "undefined"
      ? apiToken(innsynAudience)
      : new Promise<string>((r) => r("token"));

  return fetchInnsynAPI(token, `soknad`);
}

export const handleSøknad: NextApiHandler<Søknad[]> = async (req, res) => {
  const { token, apiToken } = await getSession(req);
  if (!token) return res.status(401).end();

  return hentSoknader(apiToken).then(res.json);
};

export default withSentry(handleSøknad);
