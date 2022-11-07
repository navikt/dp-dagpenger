import { rest } from "msw";
import syntheticUserFnr from "./syntheticUserFnr";
import { dokumentListeResolver } from "./dokumenter";
import behandlingsstatusResolver from "./behandlingsstatus";
import personaliaResolver from "./personalia";
import soknaderResolver from "./soknader";
import unleashResolver from "./unleash";
import api from "../../../lib/api";
import { ettersendingResolver } from "../backend/ettersendelser";

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
  rest.get(api("/behandlingsstatus"), behandlingsstatusResolver),
  rest.get(api("/personalia"), personaliaResolver),
  rest.get(api("/soknader"), soknaderResolver),
  rest.get(api("/ettersendelser"), ettersendingResolver),
  rest.get("https://unleash.nais.io/api/client/features", unleashResolver),
];
