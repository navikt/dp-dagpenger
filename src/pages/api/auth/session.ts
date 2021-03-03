import nc from "next-connect";
import middleware from "../../../middlewares";
import { extractUser } from "../../../lib/api-helpers";

export default nc()
  .use(middleware)
  .get(async (req, res) => {
    // @ts-ignore
    return res.json({ user: extractUser(req) });
  });
