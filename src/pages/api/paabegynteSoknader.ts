import { NextApiHandler } from "next";
import { withSentry } from "@sentry/nextjs";
import { fetchInnsynAPI } from "../../lib/api/innsyn";
import { getSession } from "../../lib/auth.utils";
import { innsynAudience } from "../../lib/audience";

export interface PaabegyntSoknad {
  tittel: string;
  behandlingsId: string;
  sistEndret: string;
  søknadId: string;
  endreLenke: string;
  erNySøknadsdialog: boolean;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function hentPaabegynteSoknader(
  token: Promise<string>,
): Promise<any> {
  return fetchInnsynAPI(token, `paabegynte`);
}

export const handlePaabegynteSoknader: NextApiHandler<
  PaabegyntSoknad[]
> = async (req, res) => {
  const session = await getSession(req);

  if (!session.token) return res.status(401).end();

  return hentPaabegynteSoknader(session.apiToken(innsynAudience)).then(
    res.json,
  );
};

export default withSentry(handlePaabegynteSoknader);
