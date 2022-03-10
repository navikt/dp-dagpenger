import { NextApiHandler } from "next";
import { withSentry } from "@sentry/nextjs";
import { getSession } from "@navikt/dp-auth/server";
import { fetchInnsynAPI } from "../../lib/api/innsyn";

export interface Ettersending {
  tittel?: string;
  søknadId?: string;
  datoInnsendt: string;
}

export async function hentEttersendelser(
  token: Promise<string>
): Promise<any[]> {
  return fetchInnsynAPI(token, `ettersendelser`);
}

export const handleEttersendelser: NextApiHandler<Ettersending[]> = async (
  req,
  res
) => {
  const { token, apiToken } = await getSession({ req });
  if (!token) return res.status(401).end();

  const audience = `${process.env.NAIS_CLUSTER_NAME}:teamdagpenger:dp-innsyn`;

  return hentEttersendelser(apiToken(audience)).then(res.json);
};

export default withSentry(handleEttersendelser);
