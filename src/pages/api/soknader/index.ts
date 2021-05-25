import { NextApiResponse } from "next";
import {
  AuthedNextApiRequest,
  withMiddleware,
} from "../../../auth/middlewares";
import { ApiOppgave } from "../../../utilities/fetchOppgaver";

export const testfjas = async (
  req: AuthedNextApiRequest
): Promise<ApiOppgave[]> => {
  const user = req.user;
  if (!user) return null;

  const token = await req.getToken(
    user.tokenset.access_token,
    "dev-gcp:teamdagpenger:dp-innsyn"
  );
  const data: ApiOppgave[] = await fetch(`${process.env.INNSYN_API}/soknader`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then((data) => data.json());

  return data;
};

const handler = async (
  req: AuthedNextApiRequest,
  res: NextApiResponse<ApiOppgave[]>
) => {
  const user = req.user;
  if (!user) return res.status(401).end();

  const token = await req.getToken(
    user.tokenset.access_token,
    "dev-gcp:teamdagpenger:dp-innsyn"
  );
  const data: ApiOppgave[] = await fetch(`${process.env.INNSYN_API}/soknader`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then((data) => data.json());

  res.json(data);
};

export default withMiddleware(handler);
