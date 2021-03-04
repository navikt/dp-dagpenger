import { withUser } from "../../../middlewares";
import { extractUser, User } from "../../../lib/api-helpers";
import { NextApiResponse } from "next";

type Session = {
  user: User;
};

export default withUser().get((req, res: NextApiResponse<Session>) => {
  return res.json({ user: extractUser(req) });
});
