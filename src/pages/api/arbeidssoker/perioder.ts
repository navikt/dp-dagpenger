import { NextApiHandler } from "next";
import { getSession } from "../../../lib/auth.utils";
import { v4 as uuid } from "uuid";
import path from "path";
import { decodeJwt } from "@navikt/dp-auth";

export type Arbeidssøkerperiode = {
  fraOgMedDato: string;
  tilOgMedDato: string;
};

const periodeFormatter = new Intl.DateTimeFormat("no", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function formaterDato(date: Date) {
  return periodeFormatter.format(date).split(".").reverse().join("-");
}

export const leggTilQueries = (fnr: string): string => {
  const idag = new Date();
  const query = new URLSearchParams();
  query.append("fnr", fnr);
  query.append("fraOgMed", formaterDato(idag));

  return `?${query.toString()}`;
};

const perioderHandler: NextApiHandler<Arbeidssøkerperiode[]> = async (
  req,
  res
) => {
  const session = await getSession(req);

  if (!session.token) return res.status(401).end();
  const payload = decodeJwt(session.token);

  const callId = uuid();
  const url = new URL(process.env.VEILARBPROXY_URL);
  url.pathname = path.join(url.pathname, "/api/arbeidssoker/perioder");
  url.search = leggTilQueries(<string>payload.pid);

  console.log(
    `Henter arbeidssøkerperioder fra veilarbregistrering (callId: ${callId})`
  );

  try {
    const { arbeidssokerperioder } = await fetch(url.toString(), {
      headers: {
        cookie: `selvbetjening-idtoken=${session.token}`,
        "Nav-Consumer-Id": "dp-dagpenger",
        "Nav-Call-Id": callId,
      },
    }).then(async (res) => {
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError(
          `Fikk ikke JSON fra veilarbregistrering (callId ${callId}). Body: ${await res.text()}.`
        );
      }

      return res.json();
    });

    console.log(
      `Svar fra veilarberegistrering (callId: ${callId})`,
      arbeidssokerperioder
    );

    return res.json(arbeidssokerperioder);
  } catch (error) {
    console.error(
      `Kall mot veilarbregistrering (callId: ${callId}) feilet. Feilmelding: ${error}`
    );

    return res.status(500).end(`Noe gikk galt (callId: ${callId})`);
  }
};

export default perioderHandler;
