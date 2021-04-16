import passport from "passport";
import idporten from "./strategy/idporten";
import { User } from "../lib/api-helpers";

passport.serializeUser((user: User, done) => {
  return done(null, user);
});
passport.deserializeUser((user: User, done) => {
  return done(null, user);
});

export async function initializeIdporten(req, res, next) {
  // @ts-ignore
  if (!!passport._strategy("idporten")) {
    return next();
  }
  passport.use("idporten", await idporten());
  return next();
}

export default passport;
