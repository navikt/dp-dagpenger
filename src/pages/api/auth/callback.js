import nc from "next-connect";
import middleware from "../../../middlewares";
import passport from "../../../middlewares/passport";

export default nc()
  .use(middleware)
  .get((req, res, next) => {
    passport.authenticate("idporten", {
      successRedirect: "/?success",
      failureRedirect: "/?failure",
    })(req, res, next);
  });
