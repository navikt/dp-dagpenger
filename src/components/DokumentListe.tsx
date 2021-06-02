import useSWR from "swr";
import NavFrontendSpinner from "nav-frontend-spinner";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import {
  Innholdstittel,
  Normaltekst,
  UndertekstBold,
} from "nav-frontend-typografi";
import { Dokument, Journalpost } from "../pages/api/dokumenter";
import Link from "next/link";
import Lenke from "nav-frontend-lenker";
import { Ikon } from "./Ikon";

function useDokumentListe() {
  const { data, error } = useSWR<Journalpost[]>(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/dokumenter`
  );

  return {
    journalposter: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function DokumentListe() {
  const { journalposter, isLoading, isError } = useDokumentListe();

  if (isLoading)
    return (
      <NavFrontendSpinner
        role="progressbar"
        aria-live="polite"
        aria-busy="true"
      />
    );
  if (isError)
    return (
      <AlertStripeFeil role="alert">
        Det er ikke mulig å hente dine dokumenter akkurat nå, vennligst prøv
        igjen senere.
      </AlertStripeFeil>
    );

  return (
    <>
      {journalposter.map((journalpost) => (
        <JournalpostUtlisting
          key={journalpost.journalpostId}
          {...journalpost}
        />
      ))}
    </>
  );
}

function JournalpostUtlisting({ tittel, dato, dokumenter }: Journalpost) {
  const localeString = new Date(dato).toLocaleString();
  return (
    <article>
      <Innholdstittel>{tittel}</Innholdstittel>
      <UndertekstBold>
        Mottatt: <time dateTime={dato}>{localeString}</time>
      </UndertekstBold>
      {dokumenter.map((dokument) => (
        <DokumentUtlisting key={dokument.id} {...dokument} />
      ))}
    </article>
  );
}

function DokumentUtlisting({ tittel, links }: Dokument) {
  const preview = links.find((link) => link.rel == "preview");
  return (
    <Link href={preview.href}>
      <Lenke href={preview.href}>
        <Ikon navn="copy" size="liten" />
        <Normaltekst>{tittel}</Normaltekst>
      </Lenke>
    </Link>
  );
}
