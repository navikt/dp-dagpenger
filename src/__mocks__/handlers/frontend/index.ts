import { rest } from "msw";
import syntheticUserFnr from "./syntheticUserFnr";
import { dokumentListeResolver } from "./dokumenter";
import personaliaResolver from "./personalia";
import soknaderResolver from "./soknader";
import api from "../../../lib/api";

export const frontendHandlers = [
  rest.get(api("/arbeidssoker/perioder"), (req, res, ctx) => {
    return res(ctx.delay(), ctx.json({ arbeidssokerperioder: [] }));
  }),
  rest.get(api("/auth/session"), (req, res, ctx) => {
    return res(
      ctx.json({
        user: { fnr: syntheticUserFnr, locale: "no" },
        expires_in: 50,
      })
    );
  }),
  rest.get(api("/dokumenter"), dokumentListeResolver),
  rest.get(api("/personalia"), personaliaResolver),
  rest.get(api("/soknader"), soknaderResolver),
];
