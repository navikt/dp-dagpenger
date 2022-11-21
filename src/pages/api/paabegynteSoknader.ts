import { NextApiHandler } from "next";
import { withSentry } from "@sentry/nextjs";
import { fetchInnsynAPI } from "../../lib/api/innsyn";
import { innsynAudience } from "../../lib/audience";
import { getSession } from "../../lib/auth.utils";

export interface PaabegyntSoknad {
  tittel: string;
  behandlingsId: string;
  sistEndret: string;
  søknadId: string;
  endreLenke: string;
  erNySøknadsdialog: boolean;
}

export async function hentPaabegynteSoknader(
  apiToken: (audience: string) => Promise<string>
): Promise<any> {
  const token: Promise<string> =
    typeof apiToken !== "undefined"
      ? apiToken(innsynAudience)
      : new Promise<string>((r) => r("token"));

  return fetchInnsynAPI(token, `paabegynte`);
}

export const handlePaabegynteSoknader: NextApiHandler<PaabegyntSoknad[]> =
  async (req, res) => {
    const { token, apiToken } = await getSession(req);
    if (!token) return res.status(401).end();

    return hentPaabegynteSoknader(apiToken).then(res.json);
  };

export default withSentry(handlePaabegynteSoknader);
