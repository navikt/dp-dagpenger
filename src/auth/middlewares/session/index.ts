import session, { SessionOptions } from "express-session";
import connectRedis, { RedisStore } from "connect-redis";
import redisClient from "./redis";
import { env } from "../../util/env.util";

const Store: RedisStore = connectRedis(session);

const SESSION_MAX_AGE_MILLISECONDS = 60 * 60 * 1000;

const options: SessionOptions = {
  secret: env("SESSION_SECRET"),
  name: env("SESSION_NAME"),
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
  console.log("Not dev, turning on secure cookie");
  //options.cookie.secure = true;
}

if (process.env.SESSION_REDIS === "true") {
  console.log("Storing sessions in Redis");
  // @ts-ignore
  options.store = new Store({
    client: redisClient,
    disableTouch: true,
  });
}

export default session(options);
