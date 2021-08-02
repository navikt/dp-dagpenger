import { NextApiResponse } from "next";
import { AuthedNextApiRequest, withMiddleware } from "../../auth/middlewares";
import { withSentry } from "@sentry/nextjs";

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

async function getApiData(token: string, endpoint: string): Promise<any> {
  return await fetch(`${process.env.INNSYN_API}/${endpoint}`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then((data) => data.json());
}

export async function hentSøknad(token: string): Promise<any[]> {
  return await getApiData(token, `soknad`);
}

export const handleSøknad = async (
  req: AuthedNextApiRequest,
  res: NextApiResponse
) => {
  const user = req.user;
  if (!user) return res.status(401).end();

  const audience = `${process.env.NAIS_CLUSTER_NAME}:teamdagpenger:dp-innsyn`;
  const token = await user.tokenFor(audience);

  res.json(await hentSøknad(token));
};

export default withSentry(withMiddleware(handleSøknad));
