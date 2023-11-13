import { HttpResponse, graphql, http } from "msw";
import { dokument, dokumenter } from "./dokumenter";
import { soknadResolver } from "./soknad";
import { paabegynteSoknadResolver } from "./paabegynteSoknader";
import { vedtakResolver } from "./vedtak";
import { unleashResolver } from "./unleash";

export const backendHandlers = [
  http.get("https://dp-innsyn.intern.dev.nav.no/soknad", soknadResolver),
  http.get(
    "https://dp-innsyn.intern.dev.nav.no/paabegynte",
    paabegynteSoknadResolver,
  ),
  http.get("http://dp-innsyn/vedtak", vedtakResolver),
  http.get(
    "http://saf.test/rest/hentdokument/:journalpostId/:dokumentId/ARKIV",
    dokument,
  ),
  graphql.query("dokumentoversiktSelvbetjening", dokumenter),
  http.get("https://unleash.nais.io/api/client/features", unleashResolver),
  http.get(
    "https://rt6o382n.apicdn.sanity.io/v2021-06-06/data/query/production",
    () => {
      return HttpResponse.json({ appTexts: [] });
    },
  ),
];
