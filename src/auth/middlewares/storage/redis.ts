import redis from "redis";

let options = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT,
};
const client = redis.createClient(options);
client.unref();
client.on("ready", console.info);
client.on("connect", console.info);
client.on("error", console.error);

export default client;
