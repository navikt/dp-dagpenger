import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../../lib/auth.utils";
import { v4 as uuid } from "uuid";
import { formatISO } from "date-fns";
import { veilarbAudience } from "../../../lib/audience";
import { logger } from "@navikt/next-logger";

export type Arbeidssøkerperiode = {
  fraOgMedDato: string;
  tilOgMedDato: string;
};

const perioderHandler: NextApiHandler<Arbeidssøkerperiode[]> = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const callId = uuid();

  try {
    const session = await getSession(req);

    if (!session) return res.status(401).end();

    const onBehalfOfToken = await session.apiToken(veilarbAudience);

    const today = formatISO(new Date(), { representation: "date" });
    const url = `${process.env.VEILARBPROXY_URL}/api/arbeidssoker/perioder/niva3?fraOgMed=${today}`;

    logger.info(`Henter arbeidssøkerperioder fra veilarbregistrering (callId: ${callId})`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${onBehalfOfToken}`,
        "Downstream-Authorization": `Bearer ${onBehalfOfToken}`,
        "Nav-Consumer-Id": "dp-dagpenger",
        "Nav-Call-Id": callId,
      },
    });

    if (!response.ok) {
      return res.status(response.status).send(response.statusText);
    }

    const perioder = await response.json();
    return res.status(response.status).json(perioder);
  } catch (error) {
    logger.error(`Kall mot veilarbregistrering (callId: ${callId}) feilet. Feilmelding: ${error}`);

    return res.status(500).end(`Noe gikk galt (callId: ${callId})`);
  }
};
export default perioderHandler;
