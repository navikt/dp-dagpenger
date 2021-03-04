import passport from "../middlewares/passport";

export default function callback(req, res, next) {
  return passport.authenticate("idporten", {
    successRedirect: "/?success",
    failureRedirect: "/?failure",
  })(req, res, next);
}
