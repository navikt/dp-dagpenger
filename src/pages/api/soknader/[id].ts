import { NextApiResponse } from "next";
import {
  AuthedNextApiRequest,
  withMiddleware,
} from "../../../auth/middlewares";
import { ApiOppgave } from "../../../utilities/fetchOppgaver";

const handler = async (
  req: AuthedNextApiRequest,
  res: NextApiResponse<ApiOppgave>
) => {
  return res.status(410).end();
  /*
  const user = req.user;
  if (!user) return res.status(401).end();

  const token = await user.tokenFor("dev-gcp:teamdagpenger:dp-innsyn");

  const { id } = req.query;
  const data: ApiOppgave = await fetch(
    `${process.env.INNSYN_API}/soknader/${id}`,
    {
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    }
  ).then((data) => data.json());

  res.json(data);
  */
};

export default withMiddleware(handler);
