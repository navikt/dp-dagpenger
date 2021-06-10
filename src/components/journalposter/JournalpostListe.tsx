import useSWR from "swr";
import NavFrontendSpinner from "nav-frontend-spinner";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import { Journalpost } from "../../pages/api/dokumenter";
import "nav-frontend-paneler-style/dist/main.css";
import React, { useState } from "react";
import { Collapse, Expand } from "@navikt/ds-icons";
import DokumentListeKnapp from "./DokumentListeKnapp";
import JournalpostDokument from "./JournalpostDokument";
import styles from "./journalposter.module.css";
import SkjultDokument from "./SkjultDokument";
import { DokumentKnapper } from "./DokumentKnapper";
import { useSession } from "../../auth/react/session.hook";
import { AvsenderMottaker } from "../../saf";

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

export default function JournalpostListe(): JSX.Element {
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

export const lastNedPdf = (preview) => (e) => {
  const a = document.createElement("a");
  a.download = String("true");
  a.href = preview.href;
  a.click();
};

function JournalpostUtlisting({
  journalpostId,
  tittel,
  dato,
  dokumenter,
  avsenderMottaker,
}: Journalpost) {
  const [visVedlegg, setVisVedlegg] = useState(false);
  const { session } = useSession();

  const toggleVisVedlegg = (e) => {
    e.preventDefault();
    setVisVedlegg(!visVedlegg);
  };

  const localeString = new Date(dato).toLocaleString("no-NO", {
    dateStyle: "short",
  });
  const hovedDokument = dokumenter.filter((d) => d.type == "Hoved")[0];
  const andreDokumenter = dokumenter.filter((d) => d.type !== "Hoved");
  const preview = hovedDokument.links.find((link) => link.rel == "preview");

  const listDokumenter = () => {
    return andreDokumenter.map((dokument) => (
      <JournalpostDokument key={dokument.id} {...dokument} />
    ));
  };

  const getVedleggsKnappeTekst = () => {
    if (!visVedlegg) return `Vis vedlegg (${andreDokumenter.length})`;
    return `Skjul vedlegg (${andreDokumenter.length})`;
  };

  const getAvsenderTekst = () => {
    switch (avsenderMottaker.type) {
      case "FNR":
        if (avsenderMottaker.id === session?.user?.fnr) {
          return "Innsendt av deg";
        } else {
          return "Innsendt av noen andre";
        }

      default:
        return "Innsendt av annen org / institusjon";
    }
  };

  return (
    <>
      <article
        className={styles.article}
        aria-labelledby={`tittel-${journalpostId}`}
      >
        <div className={styles.journalpost}>
          <Undertekst style={{ color: "#6A6A6A" }}>
            Mottatt: <time dateTime={dato}>{localeString}</time> -{" "}
            {getAvsenderTekst()}
          </Undertekst>
          <div className={styles.tittelKnappContainer}>
            <div className={styles.tittelBoks}>
              <Undertittel id={`tittel-${journalpostId}`}>{tittel}</Undertittel>
            </div>
            {!hovedDokument.brukerHarTilgang && <SkjultDokument />}
            {hovedDokument.brukerHarTilgang && (
              <DokumentKnapper preview={preview} />
            )}
          </div>
          {andreDokumenter.length > 0 && (
            <>
              <DokumentListeKnapp
                tekst={getVedleggsKnappeTekst()}
                onClick={toggleVisVedlegg}
                Ikon={visVedlegg ? Collapse : Expand}
              />
              <div
                className={visVedlegg ? styles.visVedlegg : styles.skjulVedlegg}
              >
                {visVedlegg ? listDokumenter() : null}
              </div>
            </>
          )}
        </div>
      </article>
    </>
  );
}
