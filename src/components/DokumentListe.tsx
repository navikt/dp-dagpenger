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
import "nav-frontend-paneler-style/dist/main.css";
import Panel from "nav-frontend-paneler";
import { useState } from "react";

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

export default function DokumentListe(): JSX.Element {
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

function JournalpostUtlisting({
  journalpostId,
  tittel,
  dato,
  dokumenter,
}: Journalpost) {
  const localeString = new Date(dato).toLocaleString("no-NO", {
    dateStyle: "long",
    timeStyle: "medium",
  });
  return (
    <>
      <article aria-labelledby={`tittel-${journalpostId}`}>
        <Panel border>
          <Innholdstittel id={`tittel-${journalpostId}`}>
            {tittel}
          </Innholdstittel>
          <UndertekstBold>
            Mottatt: <time dateTime={dato}>{localeString}</time>
          </UndertekstBold>
          {dokumenter.map((dokument) => (
            <DokumentUtlisting
              key={dokument.id}
              journalpostId={journalpostId}
              {...dokument}
            />
          ))}
        </Panel>
      </article>
      <style jsx>{`
        article {
          margin: 1em 0;
        }
      `}</style>
    </>
  );
}

function DokumentUtlisting({
  journalpostId,
  id: dokumentId,
  tittel,
  links,
}: Dokument & { journalpostId: string }) {
  const [vis, setVis] = useState(false);
  const preview = links.find((link) => link.rel == "preview");
  return (
    <>
      <Link href={preview.href} passHref>
        <Lenke href={preview.href}>
          <Ikon navn="copy" size="liten" />
          <Normaltekst>{tittel}</Normaltekst>
        </Lenke>
      </Link>
      {vis && (
        <DokumentForhåndsvisning
          journalpostId={journalpostId}
          dokumentId={dokumentId}
        />
      )}
      <button
        onClick={() => {
          setVis(!vis);
        }}
      >
        {vis ? "Skjul" : "Vis"}
      </button>
    </>
  );
}

function DokumentForhåndsvisning({
  journalpostId,
  dokumentId,
}: {
  journalpostId: string;
  dokumentId: string;
}) {
  return (
    <>
      <embed
        src={`/arbeid/dagpenger/mine-dagpenger/api/dokumenter/${journalpostId}/${dokumentId}/forhandsvisning`}
      />

      <style jsx>{`
        embed {
          height: 500px;
          width: 500px;
        }
      `}</style>
    </>
  );
}
