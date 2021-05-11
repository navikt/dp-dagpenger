import { TokenSet } from "openid-client";
import { AuthedNextApiRequest } from "../middlewares";

export type User = {
  fnr: string;
  locale: string;
  tokenset: TokenSet;
};

export type Session = {
  user?: {
    fnr?: string;
    locale?: string;
  };
  expires_in?: number;
};

export function maskUser(req: AuthedNextApiRequest): Session {
  if (!req.user) return null;
  const { fnr, locale, tokenset } = req.user;
  return { user: { fnr, locale }, expires_in: tokenset.expires_in };
}
