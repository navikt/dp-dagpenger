import { NextApiResponse } from "next";
import { AuthedNextApiRequest } from "../middlewares";
import { extractUser, User } from "../lib/api-helpers";

type Session = {
  user?: User;
};

export default function session(
  req: AuthedNextApiRequest,
  res: NextApiResponse<Session>
) {
  if (!req.user) {
    return res.json({});
  }
  return res.json({ user: extractUser(req) });
}
