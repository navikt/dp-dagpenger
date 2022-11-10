import { graphql, rest } from "msw";
import { dokument, dokumenter } from "./dokumenter";
import { soknadResolver } from "./soknad";
import { paabegynteSoknadResolver } from "./paabegynteSoknader";
import { vedtakResolver } from "./vedtak";
import { ettersendingResolver } from "./ettersendelser";
import { unleashResolver } from "./unleash";

export const backendHandlers = [
  rest.get("https://dp-innsyn.dev.intern.nav.no/soknad", soknadResolver),
  rest.get(
    "https://dp-innsyn.dev.intern.nav.no/paabegynte",
    paabegynteSoknadResolver
  ),
  rest.get("http://dp-innsyn/ettersendelser", ettersendingResolver),
  rest.get("http://dp-innsyn/vedtak", vedtakResolver),
  rest.get(
    "http://saf.test/rest/hentdokument/:journalpostId/:dokumentId/ARKIV",
    dokument
  ),
  graphql.query("dokumentoversiktSelvbetjening", dokumenter),
  rest.get("https://unleash.nais.io/api/client/features", unleashResolver),
];
