import { NextApiResponse } from "next";
import { AuthedNextApiRequest } from "../middlewares";

type MaskedSession = {
  fnr?: string;
  locale?: string;
};

 function maskUser(req): MaskedSession {
  if (!req.user) return null;
  const { fnr, locale } = req.user;
  return { fnr, locale };
}

export default function session(
  req: AuthedNextApiRequest,
  res: NextApiResponse<MaskedSession>
) {
  if (!req.user) {
    return res.json({});
  }
  return res.json(maskUser(req));
}
