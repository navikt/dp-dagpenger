import { NextApiHandler } from "next";
import { withSentry } from "@sentry/nextjs";
import { getSession } from "../../lib/auth.utils";
import { fetchInnsynAPI } from "../../lib/api/innsyn";
import { innsynAudience } from "../../lib/audience";

export interface EttersendingResultat {
  results: Ettersending[];
  successFullSources: string[];
  failedSources: string[];
}

export interface Ettersending {
  tittel?: string;
  søknadId?: string;
  datoInnsendt: string;
}

export async function hentEttersendelser(token: Promise<string>): Promise<any> {
  return fetchInnsynAPI(token, `ettersendelser`);
}

export const handleEttersendelser: NextApiHandler<EttersendingResultat> =
  async (req, res) => {
    const session = await getSession(req);
    if (!session.token) return res.status(401).end();

    return hentEttersendelser(session.apiToken(innsynAudience)).then(res.json);
  };

export default withSentry(handleEttersendelser);
