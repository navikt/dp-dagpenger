import { NextApiResponse } from "next";
import { AuthedNextApiRequest } from "../middlewares";
import { extractUser, Session } from "../lib/api-helpers";

export default function session(
  req: AuthedNextApiRequest,
  res: NextApiResponse<Session>
) {
  if (!req.user) {
    return res.json({});
  }
  return res.json(extractUser(req));
}
