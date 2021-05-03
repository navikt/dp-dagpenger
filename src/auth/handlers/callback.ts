import passport from "../middlewares/passport";

const successRedirect = process.env.LOGINSERVICE_URL
  ? `${process.env.LOGINSERVICE_URL}?redirect=${process.env.SELF_URL}`
  : "/";

export default function callback(req, res, next) {
  return passport.authenticate("idporten", {
    successRedirect,
    failureRedirect: "/?failure",
  })(req, res, next);
}
