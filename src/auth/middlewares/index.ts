import nc, { NextConnect } from "next-connect";
import passport, { initializeIdporten } from "./passport";
import session from "./session";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../lib/api-helpers";
import tokenx from "./tokenx";

const middleware = nc();

middleware
  .use(session)
  .use(initializeIdporten)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session())
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
