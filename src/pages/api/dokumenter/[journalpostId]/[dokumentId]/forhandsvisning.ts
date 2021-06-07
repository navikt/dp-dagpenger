import { NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import {
  AuthedNextApiRequest,
  withMiddleware,
} from "../../../../../auth/middlewares";

import fetch from "node-fetch";

const audience = `${process.env.SAF_SELVBETJENING_CLUSTER}:teamdokumenthandtering:safselvbetjening`;

type Dokument = {
  headers: {
    contentDisposition: string;
  };
  blob: Blob;
};
async function hentDokument(
  token: string,
  journalpostId: string,
  dokumentInfoId: string
): Promise<Dokument> {
  const callId = uuidv4();
  const endpoint = `${process.env.SAF_SELVBETJENING_INGRESS}/rest/hentdokument/${journalpostId}/${dokumentInfoId}/ARKIV`;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Nav-Callid": callId,
    "Nav-Consumer-Id": "dp-dagpenger",
  };

  try {
    console.log(`Henter dokument med call-id: ${callId}`);
    return await fetch(endpoint, { headers }).then(async (res) => {
      const headers = {
        contentDisposition: res.headers.get("Content-Disposition"),
      };

      return { headers, blob: await res.blob() };
    });
  } catch (error) {
    console.error(`Feil fra SAF med call-id ${callId}: ${error}`);
    throw error;
  }
}

export async function handleHentDokument(
  req: AuthedNextApiRequest,
  res: NextApiResponse
) {
  const user = req.user;
  if (!user) return res.status(401).end();
  const token = await user.tokenFor(audience);
  const { journalpostId, dokumentId } = req.query;

  try {
    const { blob: dokument, headers } = await hentDokument(
      token,
      <string>journalpostId,
      <string>dokumentId
    );

    res.setHeader(
      "Content-Disposition",
      headers.contentDisposition || "inline"
    );
    res.setHeader("Content-Type", dokument.type);
    const buffer = Buffer.from(new Uint8Array(await dokument.arrayBuffer()));

    return res.send(buffer);
  } catch (errors) {
    return res.status(500).send(errors);
  }
}

export default withMiddleware(handleHentDokument);
