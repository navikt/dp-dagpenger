import passport from "passport";
import idporten from "./strategy/idporten";
import { TokenSet } from "openid-client";
import users, { User } from "./users";

export type Session = {
  subject: string;
  locale: string;
};

passport.serializeUser((user: User, done) => {
  const session: Session = {
    subject: user.subject,
    locale: user.locale,
  };
  return done(null, session);
});

passport.deserializeUser((session: Session, done) => {
  users
    .getUser(session.subject)
    .then(
      (user): User => ({
        ...user,
        tokenset: new TokenSet(user.tokenset),
      })
    )
    .then((user: User) => done(null, user));
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
