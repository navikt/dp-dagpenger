import { getSession } from "../../auth/hooks/session";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).end();
  // @ts-ignore
  const token = await req.getToken(session.access_token);
  const data = await fetch(process.env.INNSYN_API, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then((data) => data.json());

  res.json(data);
};
