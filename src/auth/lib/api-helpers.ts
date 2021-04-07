export type User = {
  fnr: string;
  locale: string;
  id_token: string;
};

export function extractUser(req): User {
  if (!req.user) return null;
  return req.user;
}
