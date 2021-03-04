import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import handlers from "./handlers";

const handler = nc().get((req: NextApiRequest, res: NextApiResponse, next) => {
  const { auth } = req.query;
  if (!auth) {
    throw new Error("Fila må kalles [...auth].js");
    return next();
  }
  const delegatedHandler = handlers[req.query.auth[0]];

  if (delegatedHandler) {
    return delegatedHandler(req, res, next);
  }

  return res.status(404).end();
});

export default handler;
