import nextConnect from "next-connect";
import middleware from "../../../middlewares";
import { extractUser } from "../../../lib/api-helpers";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const user = { name: "foo" };

  // @ts-ignore
  req.logIn(user, (err) => {
    if (err) throw err;
    // when we finally log in, return the (filtered) user object
    // @ts-ignore
    res.status(201).json({
      user: extractUser(req),
    });
  });
});

export default handler;
