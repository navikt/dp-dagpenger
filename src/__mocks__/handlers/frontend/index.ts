import { HttpResponse, http } from "msw";
import { syntheticUserFnr } from "./syntheticUserFnr";
import { dokumentListeResolver } from "./dokumenter";
import { arbeidssokerperioderResolver } from "../resolvers/arbeidssokerperioder";
import kontoResolver from "./konto";
import soknaderResolver from "./soknader";
import api from "../../../lib/api";

export const frontendHandlers = [
  http.get(api("/arbeidssoker/perioder"), () => {
    return HttpResponse.json(arbeidssokerperioderResolver);
  }),
  http.get(api("/auth/session"), () => {
    return HttpResponse.json({
      user: { fnr: syntheticUserFnr, locale: "no" },
      expires_in: 50,
    });
  }),
  http.get(api("/dokumenter"), dokumentListeResolver),
  http.get(api("/konto"), kontoResolver),
  http.get(api("/soknader"), soknaderResolver),
];
