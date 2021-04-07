import { getSession } from "../../auth/hooks/session";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import tokenx from "../../auth/middlewares/tokenx";
import { AuthedNextApiRequest } from "../../auth/middlewares";

export default nc()
  .use(tokenx)
  .get(async (req: AuthedNextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) return res.status(401).end();
    const token = await req.getToken(
      session.user.id_token,
      "dev-gcp:teamdagpenger:dp-innsyn"
    );
    const data = await fetch(process.env.INNSYN_API, {
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    }).then((data) => data.json());

    res.json(data);
  });
