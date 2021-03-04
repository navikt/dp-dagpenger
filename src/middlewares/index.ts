import nc, { NextConnect } from "next-connect";
import passport, { initializeIdporten } from "./passport";
import session from "./session";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../lib/api-helpers";

const middleware = nc();

middleware
  .use(session)
  .use(initializeIdporten)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session());

export default middleware;

export function withMiddleware(): NextConnect<NextApiRequest, NextApiResponse> {
  return nc().use(middleware);
}

export function withUser(): NextConnect<AuthedNextApiRequest, NextApiResponse> {
  return nc()
    .use(middleware)
    .all((req: AuthedNextApiRequest, res: NextApiResponse, next) => {
      if (!req.isAuthenticated() || !req.user) {
        res.status(401).end();
      } else {
        next();
      }
    });
}

export interface AuthedNextApiRequest extends NextApiRequest {
  user: User;
  logout: () => void;
  logOut: () => void;
  login: () => void;
  logIn: () => void;
  isAuthenticated: () => boolean;
}
