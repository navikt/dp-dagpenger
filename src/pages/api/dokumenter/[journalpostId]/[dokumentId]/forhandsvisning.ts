import { logger } from "@navikt/next-logger";
import { ReadableWebToNodeStream } from "readable-web-to-node-stream";
import { v4 as uuidv4 } from "uuid";
import { getSession } from "../../../../../lib/auth.utils";

const audience = `${process.env.SAF_SELVBETJENING_CLUSTER}:teamdokumenthandtering:${process.env.SAF_SELVBETJENING_SCOPE}`;

export const config = {
  api: {
    responseLimit: false,
  },
};

const handleHentDokument = async (req, res) => {
  const session = await getSession(req);
  if (!session.token) return res.status(401).end();

  const callId = uuidv4();
  const { journalpostId, dokumentId } = req.query;
  const oboToken = await session.apiToken(audience);
  const requestUrl = `${process.env.VITE_SAF_SELVBETJENING_INGRESS}/rest/hentdokument/${journalpostId}/${dokumentId}/ARKIV`;
  const requestHeaders = {
    headers: {
      Authorization: `Bearer ${oboToken}`,
      "Nav-Callid": callId,
      "Nav-Consumer-Id": "dp-dagpenger",
    },
  };

  try {
    const response = await fetch(requestUrl, requestHeaders);
    const readableWebStream = response.body;
    return new ReadableWebToNodeStream(readableWebStream);
  } catch (errors) {
    logger.error(`Feil fra SAF med call-id ${callId}: ${errors}`);
    return res.status(500).send(errors);
  }
};

export default handleHentDokument;
