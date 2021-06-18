import { rest } from "msw";
import syntheticUserFnr from "./syntheticUserFnr";
import { dokumentListeResolver } from "./dokumenter";
import behandlingsstatusResolver from "./behandlingsstatus";

export const frontendHandlers = [
  rest.get(endpoint("/api/registrering"), (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(204));
  }),
  rest.get(endpoint("/api/auth/session"), (req, res, ctx) => {
    return res(
      ctx.json({
        user: { fnr: syntheticUserFnr, locale: "no" },
        expires_in: 50,
      })
    );
  }),
  rest.get(endpoint("/api/dokumenter"), dokumentListeResolver),
  rest.get(endpoint("/api/behandlingsstatus"), behandlingsstatusResolver),
];

export function endpoint(url: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH}${url}`;
}
