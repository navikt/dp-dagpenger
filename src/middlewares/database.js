import redis from "redis";

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT,
});
client.unref();
client.on("error", console.error);

export default async function database(req, res, next) {
  req.redisClient = client;
  return next();
}
