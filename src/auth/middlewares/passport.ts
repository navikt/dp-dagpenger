import passport from "passport";
import idporten, { User } from "./strategy/idporten";

passport.serializeUser((user: User, done) => {
  return done(null, user);
});
passport.deserializeUser((user: User, done) => {
  return done(null, user);
});

export async function initializeIdporten(req, res, next) {
  if (!!passport._strategy("idporten")) {
    return next();
  }
  passport.use("idporten", await idporten());
  return next();
}

export default passport;
