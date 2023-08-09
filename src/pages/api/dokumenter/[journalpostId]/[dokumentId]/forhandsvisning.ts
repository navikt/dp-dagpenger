import { NextApiHandler } from "next";
import { v4 as uuidv4 } from "uuid";
import { withSentry } from "@sentry/nextjs";
import { getSession } from "../../../../../lib/auth.utils";
import { Readable, Stream } from "stream";
import { logger } from "@navikt/next-logger";

const audience = `${process.env.SAF_SELVBETJENING_CLUSTER}:teamdokumenthandtering:${process.env.SAF_SELVBETJENING_SCOPE}`;

export const config = {
  api: {
    responseLimit: false,
  },
};

async function hentDokument(
  token: string,
  journalpostId: string,
  dokumentInfoId: string,
  callId: uuidv4,
): Promise<Response> {
  const endpoint = `${process.env.SAF_SELVBETJENING_INGRESS}/rest/hentdokument/${journalpostId}/${dokumentInfoId}/ARKIV`;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Nav-Callid": callId,
    "Nav-Consumer-Id": "dp-dagpenger",
  };

  return fetch(endpoint, { headers });
}

export const handleHentDokument: NextApiHandler<Stream> = async (req, res) => {
  const session = await getSession(req);
  if (!session.token) return res.status(401).end();

  const { journalpostId, dokumentId } = req.query;
  const callId = uuidv4();
  return hentDokument(
    await session.apiToken(audience),
    <string>journalpostId,
    <string>dokumentId,
    callId,
  )
    .then(async (dokumentResponse) => {
      res.setHeader(
        "Content-Disposition",
        dokumentResponse.headers.get("Content-Disposition") || "inline",
      );

      // Vi kan ikke bruke ReadableStream direkte fra fetch her, siden NextJS trenger en
      // node ReadableStream, og vi får ut en web ReadableStream. Går dermed veien gjennom
      // Buffer for å oversette den ene ReadableStream'en til den andre. Vi fant feil med
      // ReadableStream.pipe når vi oppgraderte til Node v18, som har innebygget fetch (fra web).
      // Før hadde de polyfillet en fetch fra node.
      // Senere kan vi teste ut https://www.npmjs.com/package/readable-web-to-node-stream
      const arrayBuffer = await dokumentResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const readable = new Readable();
      readable._read = () => {}; // _read is required but you can noop it
      readable.push(buffer);
      readable.push(null);

      readable.pipe(res);
    })
    .catch((errors) => {
      console.log(errors);
      logger.error(`Feil fra SAF med call-id ${callId}: ${errors}`);
      return res.status(500).send(errors);
    });
};

export default withSentry(handleHentDokument);
