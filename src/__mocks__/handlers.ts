import { graphql, rest } from "msw";
import faker from "faker";
import { soknadByIdResolver, soknaderResolver } from "./resolvers/soknader";
import { dokument, dokumenter } from "./resolvers/dokumenter";
import { Journalpost } from "../pages/api/dokumenter";
import { AvsenderMottakerIdType } from "../saf";

const syntheticUserFnr = "1234";

export const handlers = [
  rest.get("/api/registrering", (req, res, ctx) => {
    //return res(ctx.json({ success: true }));
    return res(ctx.status(204));
  }),
  rest.get("/api/auth/session", (req, res, ctx) => {
    return res(
      ctx.json({
        user: { fnr: syntheticUserFnr, locale: "no" },
        expires_in: 50,
      })
    );
  }),
  rest.get("http://localhost:3000/api/soknader", soknaderResolver),
  rest.get("/api/soknader", soknaderResolver),
  rest.get("/api/soknader/:soknadsId", soknadByIdResolver),
  graphql.query("dokumentoversiktSelvbetjening", dokumenter),
  rest.get(
    "http://saf.test/rest/hentdokument/:journalpostId/:dokumentId/ARKIV",
    dokument
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/dokumenter`,
    (req, res, ctx) => {
      const journalposter: Journalpost[] = [...Array(5)].map((_, ji) => {
        const journalpostId = faker.datatype.number();
        const antallDokumenter = ji === 4 ? 1 : 3;
        return {
          journalpostId,
          tittel: faker.lorem.sentence(),
          dato: faker.date.past(),
          avsenderMottaker: {
            id: ji === 2 ? syntheticUserFnr : faker.datatype.uuid(),
            type: AvsenderMottakerIdType.Fnr,
          },
          tema: "DAG",
          dokumenter: [...Array(antallDokumenter)].map((_, i) => {
            const id = faker.datatype.uuid();
            const type = i == 0 ? "Hoved" : "Vedlegg";
            const skjulDokument =
              (ji === 3 && i === 0) || (ji === 2 && i === 1);
            return {
              id,
              tittel: faker.lorem.sentence(),
              type,
              brukerHarTilgang: !skjulDokument,
              links: [
                {
                  href: `/api/dokumenter/${journalpostId}/${id}/forhandsvisning`,
                  rel: "preview",
                  type: "GET",
                },
              ],
            };
          }),
        };
      });
      return res(ctx.json(journalposter));
    }
  ),
];
