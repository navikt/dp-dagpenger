import { NextApiResponse } from "next";
import { AuthedNextApiRequest, withMiddleware } from "../../auth/middlewares";

const handler = async (req: AuthedNextApiRequest, res: NextApiResponse) => {
  const user = req.user;
  if (!user) return res.status(401).end();

  const token = await req.getToken(
    user.id_token,
    "dev-gcp:teamdagpenger:dp-innsyn"
  );
  console.log({ token });
  const data = await fetch(`${process.env.INNSYN_API}/søknad/123`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  }).then((data) => data.json());

  res.json(data);
};

export default withMiddleware(handler);
