import { v4 as uuid } from "uuid";
import { NextApiHandler } from "next";
import { getSession } from "../../lib/auth.utils";

export type Personalia = {
  kontonummer: string;
};

const personaliaHandler: NextApiHandler<Personalia> = async (req, res) => {
  const { token } = await getSession(req);
  if (!token) return res.status(401).end();

  const idtoken = req.cookies["selvbetjening-idtoken"];
  if (!idtoken) return res.status(401).end();

  const callId = uuid();
  const url = new URL(`${process.env.PERSONOPPLYSNINGER_API_URL}/personalia`);

  console.log(
    `Henter personalia fra personopplysninger API (callId: ${callId})`
  );

  try {
    const { personalia } = await fetch(url.toString(), {
      headers: {
        cookie: `selvbetjening-idtoken=${idtoken}`,
        "Nav-Consumer-Id": "dp-dagpenger",
        "Nav-Call-Id": callId,
      },
    }).then(async (apiResponse) => {
      const contentType = apiResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError(
          `Fikk ikke JSON fra personopplysninger API (callId ${callId}). Body: ${await apiResponse.text()}.`
        );
      }

      return apiResponse.json();
    });

    const response: Personalia = { kontonummer: personalia.kontonr };
    return res.json(response);
  } catch (error) {
    console.error(
      `Kall mot personopplysninger API (callId: ${callId}) feilet. Feilmelding: ${error}`
    );

    res.status(500).end(`Noe gikk galt (callId: ${callId})`);
  }
};

export default personaliaHandler;
