import { graphql, rest } from "msw";
import { dokument, dokumenter } from "./dokumenter";
import { soknadResolver } from "./soknad";
import { vedtakResolver } from "./vedtak";

export const backendHandlers = [
  rest.get("http://dp-innsyn/soknad", soknadResolver),
  rest.get("http://dp-innsyn/vedtak", vedtakResolver),
  rest.get(
    "http://saf.test/rest/hentdokument/:journalpostId/:dokumentId/ARKIV",
    dokument
  ),
  graphql.query("dokumentoversiktSelvbetjening", dokumenter),
];
