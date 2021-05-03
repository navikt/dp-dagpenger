import passport from "../middlewares/passport.mw";

export default function signin(req, res, next) {
  return passport.authenticate("idporten")(req, res, next);
}
