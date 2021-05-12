import { rest } from "msw";
import {
  ettersendingMedEttVedlegg,
  fattetVedtak,
  soknadMedToManglendeVedlegg,
} from "./resolvers/oppgaver";
import { soknadByIdResolver, soknaderResolver } from "./resolvers/soknader";

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

  rest.get("/api/soknader", soknaderResolver),

  rest.get("/api/soknader/:soknadsId", soknadByIdResolver),
];
