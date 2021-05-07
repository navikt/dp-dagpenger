import { createClient, ClientOpts } from "redis";

const options: ClientOpts = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: parseInt(process.env.REDIS_PORT),
};
const client = createClient(options);
client.unref();
client.on("error", console.error);

export default client;
