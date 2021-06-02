import { NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import {
  AuthedNextApiRequest,
  withMiddleware,
} from "../../../../../auth/middlewares";

const audience = `${process.env.SAF_SELVBETJENING_CLUSTER}:teamdokumenthandtering:safselvbetjening`;

async function hentDokument(
  token: string,
  journalpostId: string,
  dokumentInfoId: string
): Promise<Blob> {
  const callId = uuidv4();
  const endpoint = `${process.env.SAF_SELVBETJENING_INGRESS}/rest/hentdokument/${journalpostId}/${dokumentInfoId}/ARKIV`;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Nav-Callid": callId,
    "Nav-Consumer-Id": "dp-dagpenger",
    Accept: "application/pdf",
  };

  try {
    console.log(`Henter dokument med call-id: ${callId}`);
    return await fetch(endpoint, { headers }).then((res) => res.blob());
  } catch (error) {
    console.error(`Feil fra SAF med call-id ${callId}: ${error}`);
    throw error;
  }
}

export async function handleDokumenter(
  req: AuthedNextApiRequest,
  res: NextApiResponse
) {
  const user = req.user;
  if (!user) return res.status(401).end();
  const token = await user.tokenFor(audience);
  const { journalpostId, dokumentId } = req.query;

  try {
    const dokument = await hentDokument(
      token,
      <string>journalpostId,
      <string>dokumentId
    );
    return res
      .setHeader("Content-type", dokument.type)
      .status(200)
      .send(await dokument.text());
  } catch (errors) {
    return res.status(500).send(errors);
  }
}

export default withMiddleware(handleDokumenter);
