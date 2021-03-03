import nc from "next-connect";
import passport from "../../../middlewares/passport";
import middlewares from "../../../middlewares";

export default nc()
  .use(middlewares)
  .get((req, res, next) => {
    passport.authenticate("idporten")(req, res, next);
  });
