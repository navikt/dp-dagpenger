import passport from "../../../middlewares/passport";
import { withMiddleware } from "../../../middlewares";

export default withMiddleware().get((req, res, next) => {
  passport.authenticate("idporten")(req, res, next);
});
