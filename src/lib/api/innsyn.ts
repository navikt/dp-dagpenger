import { v4 as uuid } from "uuid";

export async function fetchInnsynAPI(
  token: Promise<string>,
  endpoint: string
): Promise<any> {
  const callId = uuid();
  const url = `${process.env.INNSYN_API}/${endpoint}`;

  console.log(`(callId: ${callId}) - Henter ${url} fra innsyn.`);

  return fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${await token}`,
      "Nav-Consumer-Id": "dp-dagpenger",
      "Nav-Call-Id": callId,
    },
  })
    .then(async (res) => {
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.log(res.status, res.statusText, res.headers);
        throw new TypeError(
          `Fikk ikke JSON fra innsyn. Body: (${await res.text()}).`
        );
      }
      console.log(`(callId: ${callId}) - Fikk svar fra innsyn`);
      return res;
    })
    .then((data) => data.json())
    .catch((err) =>
      console.error(
        `(callId: ${callId}) - Kunne ikke hente ${endpoint} fra innsyn. Feilmelding: ${err}`
      )
    );
}
