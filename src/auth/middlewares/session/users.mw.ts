import { TokenSet } from "openid-client";
import { getAsync, setAsync } from "./redis";

export type User = {
    subject: string;
    fnr: string;
    locale: string;
    tokenset: TokenSet;
  };

 export async function getUser(subject: string): Promise<User> {
      return JSON.parse(await getAsync(subject));
  }
  
  export async function setUser(user: User): Promise<User> {
      return await setAsync(user.subject, JSON.stringify(user));
  }