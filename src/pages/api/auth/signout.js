import nc from "next-connect";
import middlewares from "../../../middlewares";

export default nc()
  .use(middlewares)
  .get((req, res) => {
    req.logOut();
    res.status(204).end();
  });
