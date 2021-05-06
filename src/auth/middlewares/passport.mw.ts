import passport from "passport";
import idporten from "./strategy/idporten";
import { TokenSet } from "openid-client";
import { getUser, User } from "./session/users.mw";

type PassportSession = {
  subject: string;
  locale: string;
};

passport.serializeUser((user: User, done) => {
  const session: PassportSession = {
    subject: user.subject,
    locale: user.locale
  };
  return done(null, session);
});

passport.deserializeUser((session: PassportSession, done) => {
  getUser(session.subject)
    .then(u => ({
      ...u,
      tokenset: new TokenSet(u.tokenset)
    }))
    .then(user => done(null, user));
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
