import redis from "redis";

let options = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT,
};
const client = redis.createClient(options);
client.unref();
client.on("error", console.error);

export default client;
