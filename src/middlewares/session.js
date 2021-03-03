import session from "express-session";
import connectRedis from "connect-redis";

const RedisStore = connectRedis(session);

const SESSION_MAX_AGE_MILLISECONDS = 60 * 60 * 1000;

export default function sessionMiddleware(req, res, next) {
  const redisStore = () =>
    new RedisStore({
      client: req.redisClient,
      disableTouch: true,
    });

  let options = {
    store: redisStore(), // TODO: Gjør dette unødvendig lokalt
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    cookie: {
      maxAge: SESSION_MAX_AGE_MILLISECONDS,
      sameSite: "lax",
      httpOnly: true,
    },
  };

  if (process.env.NODE_ENV !== "development") {
    options.cookie.secure = true;
    //options.store = redisStore()
  }

  return session(options)(req, res, next);
}
