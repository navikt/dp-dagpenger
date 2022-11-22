import { NextApiHandler } from "next";
import { withSentry } from "@sentry/nextjs";
import { fetchInnsynAPI } from "../../lib/api/innsyn";
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
  token: Promise<string>
): Promise<any> {
  return fetchInnsynAPI(token, `paabegynte`);
}

export const handlePaabegynteSoknader: NextApiHandler<PaabegyntSoknad[]> =
  async (req, res) => {
    const { token, apiToken } = await getSession(req);

    if (!token) return res.status(401).end();

    const audience = `${process.env.NAIS_CLUSTER_NAME}:teamdagpenger:dp-innsyn`;

    return hentPaabegynteSoknader(apiToken(audience)).then(res.json);
  };

export default withSentry(handlePaabegynteSoknader);
