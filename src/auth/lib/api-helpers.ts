export type User = {
  fnr: string;
  locale: string;
  id_token: string;
};

export type Session = {
  fnr?: string;
  locale?: string;
};

export function maskUser(req): Session {
  if (!req.user) return null;
  const { fnr, locale } = req.user;
  return { fnr, locale };
}
