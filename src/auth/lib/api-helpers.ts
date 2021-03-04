export type User = {
  fnr: string;
  locale: string;
};

export function extractUser(req): User {
  if (!req.user) return null;
  const { locale, pid: fnr } = req.user;
  return {
    fnr,
    locale,
  };
}
