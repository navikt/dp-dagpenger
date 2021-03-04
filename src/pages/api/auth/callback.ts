import { withMiddleware } from "../../../middlewares";
import passport from "../../../middlewares/passport";

export default withMiddleware().get((req, res, next) => {
  passport.authenticate("idporten", {
    successRedirect: "/?success",
    failureRedirect: "/?failure",
  })(req, res, next);
});
