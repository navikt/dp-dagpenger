export type User = {
  fnr: string;
  locale: string;
  access_token: string;
};

export function extractUser(req): User {
  if (!req.user) return null;
  return req.user;
}
