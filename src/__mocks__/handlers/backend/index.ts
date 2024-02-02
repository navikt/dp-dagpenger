import { graphql, http } from "msw";
import { dokument, dokumenter } from "./dokumenter";
import { paabegynteSoknadResolver } from "./paabegynteSoknader";
import { soknadResolver } from "./soknad";
import { unleashResolver } from "./unleash";
import { vedtakResolver } from "./vedtak";

export const backendHandlers = [
  http.get("https://dp-innsyn.intern.dev.nav.no/soknad", soknadResolver),
  http.get("https://dp-innsyn.intern.dev.nav.no/paabegynte", paabegynteSoknadResolver),
  http.get("http://dp-innsyn/vedtak", vedtakResolver),
  http.get("http://saf.test/rest/hentdokument/:journalpostId/:dokumentId/ARKIV", dokument),
  graphql.query("dokumentoversiktSelvbetjening", dokumenter),
  http.get("https://unleash.nais.io/api/client/features", unleashResolver),
];
