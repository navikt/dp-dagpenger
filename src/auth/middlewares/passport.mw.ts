import passport from "passport";
import idporten from "./strategy/idporten";
import { User } from "../lib/api-helpers";
import { TokenSet } from "openid-client";
import users from "./users";

passport.serializeUser((user: User, done) => {
  return done(null, user.subject);
});
passport.deserializeUser((subject: string, done) => {
  users
    .getUser(subject)
    .then((user) => ({
      ...user,
      tokenset: new TokenSet(user.tokenset),
    }))
    .then((user) => done(null, user));
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
