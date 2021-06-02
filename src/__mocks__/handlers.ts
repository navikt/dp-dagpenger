import { graphql, rest } from "msw";
import {
  ettersendingMedEttVedlegg,
  fattetVedtak,
  soknadMedToManglendeVedlegg,
} from "./resolvers/oppgaver";
import { soknadByIdResolver, soknaderResolver } from "./resolvers/soknader";
import { dokument, dokumenter } from "./resolvers/dokumenter";

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
];
