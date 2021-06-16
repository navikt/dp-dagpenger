import { NextApiResponse } from "next";
import { AuthedNextApiRequest, withMiddleware } from "../../auth/middlewares";

const antallDager = 28;

export type Behandlingsstatus = {
  status: Status;
  antallSøknader: number;
  antallVedtak: number;
};

export type Status =
  | null
  | "UnderBehandling"
  | "FerdigBehandlet"
  | "UnderOgFerdigBehandlet";

async function getApiData(token: string, endpoint: string): Promise<any> {
  return await fetch(`${process.env.INNSYN_API}/${endpoint}`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then((data) => data.json());
}

export async function hentBehandlingsstatus(
  token: string
): Promise<Behandlingsstatus> {
  const fom = new Date();
  fom.setDate(fom.getDate() - antallDager);

  const søknader: any[] = await getApiData(
    token,
    `soknad?søktFom=${getISODate(fom)}`
  );
  const vedtak: any[] = await getApiData(
    token,
    `vedtak?fattetFom=${getISODate(fom)}`
  );

  const antallSøknader = søknader.length;
  const antallVedtak = vedtak.length;

  let status: Status = null;
  if (antallSøknader > antallVedtak && antallVedtak > 0) {
    status = "UnderOgFerdigBehandlet";
  } else if (antallVedtak > 0) {
    status = "FerdigBehandlet";
  } else if (antallSøknader > 0) {
    status = "UnderBehandling";
  }

  return {
    status,
    antallSøknader,
    antallVedtak,
  };
}

export const handleBehandlingsstatus = async (
  req: AuthedNextApiRequest,
  res: NextApiResponse<Behandlingsstatus>
) => {
  const user = req.user;
  if (!user) return res.status(401).end();

  // TODO: Bruk en bedre variabel for dette
  const audience = `${process.env.SAF_SELVBETJENING_CLUSTER}:teamdagpenger:dp-innsyn`;
  const token = await user.tokenFor(audience);

  res.json(await hentBehandlingsstatus(token));
};

export default withMiddleware(handleBehandlingsstatus);

function getISODate(date: Date) {
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
}
