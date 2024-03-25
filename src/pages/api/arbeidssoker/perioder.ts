import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../../lib/auth.utils";
import { v4 as uuid } from "uuid";
import { audienceArbeidsoekkerregisteret } from "../../../lib/audience";
import { logger } from "@navikt/next-logger";

type brukerTypeResponse = "UKJENT_VERDI" | "UDEFINERT" | "VEILEDER" | "SYSTEM" | "SLUTTBRUKER";

export interface IArbeidssokerperiode {
  periodeId: string;
  startet: IArbeidssoekkerMetaResponse;
  avsluttet: IArbeidssoekkerMetaResponse | null;
}

interface IArbeidssoekkerMetaResponse {
  tidspunkt: string;
  utfoertAv: { type: brukerTypeResponse };
  kilde: string;
  aarsak: string;
}

const perioderHandler: NextApiHandler<IArbeidssokerperiode[]> = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const callId = uuid();

  try {
    const session = await getSession(req);

    if (!session) return res.status(401).end();

    const onBehalfOfToken = await session.apiToken(audienceArbeidsoekkerregisteret);

    const url = `${process.env.ARBEIDSSOEKERREGISTERET_URL}/api/v1/arbeidssoekerperioder`;

    logger.info(`Henter arbeidssøkerperioder fra arbeidssoekerregisteret (callId: ${callId})`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${onBehalfOfToken}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).send(response.statusText);
    }

    const perioder = await response.json();

    return res.status(response.status).json(perioder);
  } catch (error) {
    logger.error(
      `Kall mot arbeidssoekerregisteret (callId: ${callId}) feilet. Feilmelding: ${error}`,
    );

    return res.status(500).end(`Noe gikk galt (callId: ${callId})`);
  }
};

export default perioderHandler;
