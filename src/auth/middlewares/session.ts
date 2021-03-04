import session from "express-session";
import connectRedis from "connect-redis";
import redisClient from "./storage/redis";

const RedisStore = connectRedis(session);

const SESSION_MAX_AGE_MILLISECONDS = 60 * 60 * 1000;

const options = {
  secret: process.env.SESSION_SECRET,
  name: process.env.SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  unset: "destroy",
  cookie: {
    maxAge: SESSION_MAX_AGE_MILLISECONDS,
    sameSite: "lax",
    httpOnly: true,
    secure: false,
  },
};

if (process.env.NODE_ENV !== "development") {
  options.cookie.secure = true;
}

if (process.env.SESSION_REDIS === "true") {
  // @ts-ignore
  options.store = new RedisStore({
    client: redisClient,
    disableTouch: true,
  });
}

export default session(options);
