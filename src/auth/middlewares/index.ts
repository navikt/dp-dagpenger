import nc, { NextConnect } from "next-connect";
import passport, { initializeIdporten } from "./passport";
import session from "./session";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "./strategy/idporten";
import { tokenx } from "./tokenx";

const middleware = nc();

middleware
  .use(tokenx)
  .use(session)
  .use(initializeIdporten)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session())
  .use((req, res, next) => {
    console.log("second");
    // @ts-ignore
    console.dir(req.cookies, { depth: 1 });
    return next();
  });

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
