import nc, { NextConnect } from "next-connect";
import passport, { initializeIdporten } from "./passport";
import session from "./session";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "./strategy/idporten";

const middleware = nc();

middleware
  .use(session)
  .use(initializeIdporten)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session());

export default middleware;

export function withMiddleware(
  handler
): NextConnect<NextApiRequest, NextApiResponse> {
  return nc().use(middleware).use(handler);
}

export interface AuthedNextApiRequest extends NextApiRequest {
  user: User;
  logout: () => void;
  logOut: () => void;
  login: () => void;
  logIn: () => void;
  isAuthenticated: () => boolean;
}
