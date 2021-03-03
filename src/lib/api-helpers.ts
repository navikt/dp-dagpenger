export function extractUser(req) {
  if (!req.user) return null;
  const { locale, pid: fnr } = req.user;
  return {
    fnr,
    locale,
  };
}
