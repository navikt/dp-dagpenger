import { getAsync, setAsync } from "./storage/redis";
import { TokenSet } from "openid-client";

export type User = {
  subject: string;
  fnr: string;
  locale: string;
  tokenset: TokenSet;
};

async function getUser(subject: string): Promise<User> {
  return JSON.parse(await getAsync(subject));
}

async function saveUser(user: User): Promise<User> {
  return await setAsync(user.subject, JSON.stringify(user));
}

export default {
  getUser,
  saveUser,
};
