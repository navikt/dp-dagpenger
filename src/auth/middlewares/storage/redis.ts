import { createClient, ClientOpts } from "redis";
import { promisify } from "util";

let options: ClientOpts = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: parseInt(process.env.REDIS_PORT),
};
const client = createClient(options);
client.unref();
client.on("error", console.error);

export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);

export default client;
