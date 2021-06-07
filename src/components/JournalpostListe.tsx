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
import { Findout, Download } from "@navikt/ds-icons";
import ForhandsvisningModal from "./ForhandsvisningModal";
import DokumentListeKnapp from "./DokumentListeKnapp";

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
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const localeString = new Date(dato).toLocaleString("no-NO", {
    dateStyle: "long",
    timeStyle: "medium",
  });
  const hovedDokument = dokumenter.filter((d) => d.type == "Hoved")[0];
  const preview = hovedDokument.links.find((link) => link.rel == "preview");

  const listDokumenter = () => {
    return null;
    return dokumenter.map((dokument) => (
      <DokumentUtlisting key={dokument.id} {...dokument} />
    ));
  };

  return (
    <>
      <article aria-labelledby={`tittel-${journalpostId}`}>
        <Panel border>
          <div className="journalpost">
            <div className="tittel-boks">
              <Undertekst
                style={{
                  color: "#6A6A6A",
                }}
              >
                Mottatt: <time dateTime={dato}>{localeString}</time>
              </Undertekst>
              <Undertittel id={`tittel-${journalpostId}`}>{tittel}</Undertittel>
            </div>
            <div className="knappe-container">
              <DokumentListeKnapp
                tekst="Last ned PDF"
                onClick={() => {
                  console.log("TODO");
                }}
                Ikon={Download}
              ></DokumentListeKnapp>
              <DokumentListeKnapp
                tekst="Forhandsvisning"
                onClick={openModal}
                Ikon={Findout}
              ></DokumentListeKnapp>
              <ForhandsvisningModal
                isOpen={modalIsOpen}
                href={preview.href}
                close={() => closeModal()}
              />
            </div>
            {listDokumenter()}
          </div>
        </Panel>
      </article>
      <style jsx>{`
        .journalpost {
          display: flex;
          justify-content: space-between;
        }
        .tittel-boks {
          flex-grow: 4;
        }
        .knappe-container,
        .tittel-boks {
          display: flex;
          flex-direction: column;
        }
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
        {vis && (
          <ForhandsvisningModal
            isOpen={vis}
            href={preview.href}
            close={() => setVis(false)}
          />
        )}
        <Flatknapp
          onClick={() => {
            setVis(!vis);
          }}
        >
          <Findout />
          {vis ? <span>Skjul</span> : <span>Forhåndsvisning</span>}
        </Flatknapp>
        <style jsx>{`
          .wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            flex-wrap: wrap;
          }
          .wrap {
            min-width: 20rem;
            max-width: 60rem;
          }
          .buttons {
            width: min-content;
          }
        `}</style>
      </div>
    </>
  );
}
