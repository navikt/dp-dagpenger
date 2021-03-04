import callback from "./callback";
import session from "./session";
import signin from "./signin";
import signout from "./signout";
import { withMiddleware } from "../middlewares";

export default {
  callback: withMiddleware(callback),
  signin: withMiddleware(signin),
  signout: withMiddleware(signout),
  session: withMiddleware(session),
};
