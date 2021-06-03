import { graphql, rest } from "msw";
import faker from "faker";
import {
  ettersendingMedEttVedlegg,
  fattetVedtak,
  soknadMedToManglendeVedlegg,
} from "./resolvers/oppgaver";
import { soknadByIdResolver, soknaderResolver } from "./resolvers/soknader";
import { dokument, dokumenter } from "./resolvers/dokumenter";
import { Journalpost } from "../pages/api/dokumenter";

export const handlers = [
  rest.get("/api/oppgaver", (req, res, ctx) => {
    if (req.url.searchParams.get("manglendeVedlegg") != undefined)
      return soknadMedToManglendeVedlegg(req, res, ctx);

    if (req.url.searchParams.get("ettersending") != undefined)
      return ettersendingMedEttVedlegg(req, res, ctx);

    if (req.url.searchParams.get("ferdig") != undefined)
      return fattetVedtak(req, res, ctx);

    return soknadMedToManglendeVedlegg(req, res, ctx);
  }),
  rest.get("/api/registrering", (req, res, ctx) => {
    //return res(ctx.json({ success: true }));
    return res(ctx.status(204));
  }),
  rest.get("/api/auth/session", (req, res, ctx) => {
    return res(
      ctx.json({ user: { fnr: "123", locale: "no" }, expires_in: 50 })
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
      const journalposter: Journalpost[] = [...Array(5)].map(() => {
        const journalpostId = faker.datatype.number();
        return {
          journalpostId,
          tittel: faker.lorem.sentence(),
          dato: faker.date.past(),
          avsenderMottaker: {
            id: faker.datatype.uuid(),
            type: "FNR",
          },
          tema: "DAG",
          dokumenter: [...Array(3)].map(() => {
            const id = faker.datatype.uuid();
            return {
              id,
              tittel: faker.lorem.sentence(),
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
