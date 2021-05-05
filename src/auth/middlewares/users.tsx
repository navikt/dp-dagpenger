import { User } from "../lib/api-helpers";
import { getAsync, setAsync } from "./storage/redis";

async function getUser(id: string): Promise<User> {
  return await getAsync(id);
}

async function saveUser(user: User): Promise<User> {
  return await setAsync(user.fnr, user);
}

export default {
  getUser,
  saveUser,
};
