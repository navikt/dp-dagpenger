import useSWR from "swr";
import NavFrontendSpinner from "nav-frontend-spinner";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import { Journalpost } from "../../pages/api/dokumenter";
import "nav-frontend-paneler-style/dist/main.css";
import Panel from "nav-frontend-paneler";
import React, { useState } from "react";
import { Findout, Download, Expand, Collapse } from "@navikt/ds-icons";
import ForhandsvisningModal from "./ForhandsvisningModal";
import DokumentListeKnapp from "./DokumentListeKnapp";
import JournalpostDokument from "./JournalpostDokument";

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

function JournalpostUtlisting({
  journalpostId,
  tittel,
  dato,
  dokumenter,
}: Journalpost) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [visVedlegg, setVisVedlegg] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const toggleVisVedlegg = (e) => {
    e.preventDefault();
    setVisVedlegg(!visVedlegg);
  };

  const localeString = new Date(dato).toLocaleString("no-NO", {
    dateStyle: "long",
    timeStyle: "medium",
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

  return (
    <>
      <article aria-labelledby={`tittel-${journalpostId}`}>
        <Panel border>
          <div className="journalpost">
            <div style={{ display: "flex", flexFlow: "row wrap" }}>
              <Undertekst
                style={{
                  color: "#6A6A6A",
                  display: "block",
                  width: "100%",
                }}
              >
                Mottatt: <time dateTime={dato}>{localeString}</time>
              </Undertekst>
              <div className="tittel-boks">
                <Undertittel id={`tittel-${journalpostId}`}>
                  {tittel}
                </Undertittel>
              </div>
              <div className="knappe-container">
                <DokumentListeKnapp
                  tekst="Last ned PDF"
                  onClick={() => {
                    console.log("TODO");
                  }}
                  Ikon={Download}
                />
                <DokumentListeKnapp
                  tekst="Forhandsvisning"
                  onClick={openModal}
                  Ikon={Findout}
                />
                {modalIsOpen && (
                  <ForhandsvisningModal
                    isOpen={modalIsOpen}
                    href={preview.href}
                    close={() => closeModal()}
                  />
                )}
              </div>
            </div>
            <div className="vedlegg-wrapper">
              <DokumentListeKnapp
                tekst={getVedleggsKnappeTekst()}
                onClick={toggleVisVedlegg}
                Ikon={visVedlegg ? Collapse : Expand}
              />
              <div className={visVedlegg ? "vis-vedlegg" : "skjul-vedlegg"}>
                {visVedlegg ? listDokumenter() : null}
              </div>
            </div>
          </div>
        </Panel>
      </article>
      <style jsx>{`
        .journalpost {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        }
        .tittel-boks {
          flex-grow: 4;
        }
        .knappe-container,
        .tittel-boks {
          display: flex;
          flex-direction: column;
        }
        .knappe-container{
          margin: 0 10px;
        }
        article {
          margin: 1em 0;
        }
        .vis-vedlegg {
          height: auto;
          opacity: 1;
          transition: opacity 600ms 0ms;
        }
        .skjul-vedlegg {
          overflow: hidden; /* Hide the element content, while height = 0 */
          height: 0;
          opacity: 0;
          transition: opacity 400ms 0ms;
      `}</style>
    </>
  );
}
