import { NextApiHandler } from "next";
import { withSentry } from "@sentry/nextjs";
import { getSession } from "@navikt/dp-auth/server";
import { fetchInnsynAPI } from "../../lib/api/innsyn";

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

export async function hentBehandlingsstatus(
  token: string
): Promise<Behandlingsstatus> {
  const fom = new Date();
  fom.setDate(fom.getDate() - antallDager);

  const [søknader, vedtak] = await Promise.all([
    fetchInnsynAPI(token, `soknad?søktFom=${getISODate(fom)}`),
    fetchInnsynAPI(token, `vedtak?fattetFom=${getISODate(fom)}`),
  ]);

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

export const handleBehandlingsstatus: NextApiHandler<Behandlingsstatus> =
  async (req, res) => {
    const { token, apiToken } = await getSession({ req });
    if (!token) return res.status(401).end();

    const audience = `${process.env.NAIS_CLUSTER_NAME}:teamdagpenger:dp-innsyn`;

    res.json(await hentBehandlingsstatus(await apiToken(audience)));
  };

export default withSentry(handleBehandlingsstatus);

function getISODate(date: Date) {
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
}
