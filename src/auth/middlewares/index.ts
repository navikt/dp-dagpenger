import nc, { NextConnect } from "next-connect";
import passport, { initializeIdporten } from "./passport.mw";
import session from "./session.mw";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../lib/api-helpers";
import tokenx from "./tokenx.mw";

const middleware = nc();

middleware
  .use(session)
  .use(initializeIdporten)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session())
  .use((req: AuthedNextApiRequest, res, next) => {
    const user = req.user;
    if (user) {
      console.log(user.tokenset.expired());
      console.log(user.tokenset.expires_in);
    }
    next();
  })
  .use(tokenx);

export default middleware;

export function withMiddleware(
  handler
): NextConnect<NextApiRequest, NextApiResponse> {
  return nc().use(middleware).use(handler);
}

export interface AuthedNextApiRequest extends NextApiRequest {
  getToken: (id_token: string, audience: string) => Promise<string>;
  user: User;
  logout: () => void;
  logOut: () => void;
  login: () => void;
  logIn: () => void;
  isAuthenticated: () => boolean;
}

export function env(key: string) {
  if (!(key in process.env)) {
    throw new Error(`Kunne ikke finne ${key} i process.env`);
  }
  return process.env[key];
}
