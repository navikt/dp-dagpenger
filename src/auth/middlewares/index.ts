import nc, { NextConnect } from "next-connect";
import passport, { initializeIdporten } from "./passport.mw";
import session from "./session";
import { NextApiRequest, NextApiResponse } from "next";
import tokenx from "./tokenx.mw";
import { User } from "./session/users.mw";

const middleware = nc();

middleware
  .use(session)
  .use(initializeIdporten)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session())
  .use((req: AuthedNextApiRequest, res, next) => {
    const user = req.user;
    console.log(user);
    return next();
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
