import nc from "next-connect";
import passport, { initializeIdporten } from "./passport";
import database from "./database";
import session from "./session";

const middleware = nc();

middleware
  .use(database)
  .use(session)
  .use(initializeIdporten)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session());

export default middleware;
