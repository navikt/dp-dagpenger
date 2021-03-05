import { getSession } from "../../auth/hooks/session";

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).end();

  res.json(session);
};
