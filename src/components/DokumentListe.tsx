import useSWR from "swr";
import NavFrontendSpinner from "nav-frontend-spinner";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import { Normaltekst, Undertekst, Undertittel } from "nav-frontend-typografi";
import { Dokument, Journalpost } from "../pages/api/dokumenter";
import Lenke from "nav-frontend-lenker";
import "nav-frontend-paneler-style/dist/main.css";
import Panel from "nav-frontend-paneler";
import React, { useState } from "react";
import { Flatknapp } from "nav-frontend-knapper";
import { Eye } from "@navikt/ds-icons";

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
          <Undertekst
            style={{
              color: "#6A6A6A",
            }}
          >
            Mottatt: <time dateTime={dato}>{localeString}</time>
          </Undertekst>
          <Undertittel id={`tittel-${journalpostId}`}>{tittel}</Undertittel>
          {dokumenter.map((dokument) => (
            <DokumentUtlisting key={dokument.id} {...dokument} />
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

function DokumentUtlisting({ tittel, links }: Dokument) {
  const [vis, setVis] = useState(false);
  const preview = links.find((link) => link.rel == "preview");
  return (
    <>
      <div className="wrapper">
        <Lenke href={preview.href}>
          <Normaltekst>{tittel}</Normaltekst>
        </Lenke>
        {vis && <DokumentForhåndsvisning href={preview.href} />}
        <Flatknapp
          mini
          onClick={() => {
            setVis(!vis);
          }}
        >
          <Eye />
          {vis ? <span>Skjul</span> : <span>Forhåndsvisning</span>}
        </Flatknapp>
        <style jsx>{`
          .wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
          }
        `}</style>
      </div>
    </>
  );
}

function DokumentForhåndsvisning({ href }: { href: string }) {
  return (
    <>
      <embed src={href} />
      <style jsx>{`
        embed {
          height: 500px;
          width: 500px;
        }
      `}</style>
    </>
  );
}
