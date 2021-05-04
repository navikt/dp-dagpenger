import passport from "passport";
import idporten from "./strategy/idporten";
import { User } from "../lib/api-helpers";
import { TokenSet } from "openid-client";

passport.serializeUser((user: User, done) => {
  return done(null, user);
});
passport.deserializeUser((savedUser: User, done) => {
  const user: User = {
    ...savedUser,
    tokenset: new TokenSet(savedUser.tokenset),
  };
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
