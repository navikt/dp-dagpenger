import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../lib/auth.utils";
import { v4 as uuid } from "uuid";
import { kontoregisterAudience } from "../../lib/audience";
import { logger } from "@navikt/next-logger";

export type Konto = {
  kontonummer: string;
  utenlandskKontoInfo?: UtenlandskKonto;
};

type UtenlandskKonto = {
  banknavn?: string;
  bankkode?: string;
  bankLandkode?: string;
  valutakode: string;
  swiftBicKode?: string;
  bankadresse1?: string;
  bankadresse2?: string;
  bankadresse3?: string;
};

const kontoHandler: NextApiHandler<Konto[]> = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const callId = uuid();

  try {
    const session = await getSession(req);

    if (!session) return res.status(401).end();

    const onBehalfOfToken = await session.apiToken(kontoregisterAudience);
    const url = `${process.env.KONTOREGISTER_URL}/hent-aktiv-konto`;

    logger.info(`Henter kontonummer fra kontoregisteret (callId: ${callId})`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${onBehalfOfToken}`,
        "Nav-Consumer-Id": "dp-dagpenger",
        "Nav-Call-Id": callId,
      },
    });

    if (!response.ok) {
      return res.status(response.status).send(response.statusText);
    }

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    logger.error(
      `Kall mot kontoregisteret (callId: ${callId}) feilet. Feilmelding: ${error}`
    );

    return res.status(500).end(`Noe gikk galt (callId: ${callId})`);
  }
};

export default kontoHandler;
