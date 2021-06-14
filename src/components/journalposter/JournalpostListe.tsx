import useSWR from "swr";
import NavFrontendSpinner from "nav-frontend-spinner";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import "nav-frontend-paneler-style/dist/main.css";
import "nav-frontend-alertstriper-style/dist/main.css";
import React, { useEffect, useRef, useState } from "react";
import { Collapse, Expand } from "@navikt/ds-icons";
import DokumentListeKnapp from "./DokumentListeKnapp";
import JournalpostDokument from "./JournalpostDokument";
import styles from "./journalposter.module.css";
import SkjultDokument from "./SkjultDokument";
import { DokumentKnapper } from "./DokumentKnapper";
import { hentAvsender } from "../../utilities/avsenderMottaker";
import { logg } from "../../utilities/amplitude";
import { AvsenderMottaker, Journalposttype } from "../../saf";

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

export type Journalpost = {
  journalpostId: string;
  journalposttype: Journalposttype;
  tittel: string;
  dato: string;
  tema: string;
  dokumenter: Dokument[];
  avsenderMottaker: AvsenderMottaker;
  brukerErAvsenderMottaker: boolean;
};
export type Dokument = {
  id: string;
  tittel: string;
  links: Link[];
  type: DokumentType;
  brukerHarTilgang: boolean;
};
export type DokumentType = "Hoved" | "Vedlegg";
export type Link = { href: string; rel: LinkRel; type: LinkType };
export type LinkType = "GET" | "POST";
export type LinkRel = "preview";

const finnHovedDokument = (dokumenter) =>
  dokumenter.filter((d) => d.type == "Hoved")[0];
const finnVedlegg = (dokumenter) =>
  dokumenter.filter((d) => d.type !== "Hoved");
const finnForhåndsvisning = (dokument) =>
  dokument.links.find((link) => link.rel == "preview");

function useTrackingVistDokumentlisten(journalposter: Journalpost[]) {
  const isFirstTracking = useRef(true);
  useEffect(() => {
    if (!journalposter) return;
    if (!isFirstTracking.current) return;
    isFirstTracking.current = false;

    const søknader = journalposter.filter((d) => d.tittel.match(/søknad/i));
    const antallDagerSidenSøknad = søknader.length
      ? antallDagerSiden(new Date(søknader[0].dato))
      : null;

    logg.vistDokumentlisten({
      antallSøknader: søknader.length,
      antallDagerSidenSøknad,
    });

    function antallDagerSiden(dato: Date) {
      return (Date.now() - +dato) / 1000 / 60 / 60 / 24;
    }
  }, [journalposter]);
}

export default function JournalpostListe(): JSX.Element {
  const { journalposter, isLoading, isError } = useDokumentListe();

  useTrackingVistDokumentlisten(journalposter);

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

export const lastNedPdf = (preview: Link) => () => {
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
  brukerErAvsenderMottaker,
  journalposttype,
}: Journalpost) {
  const [visVedlegg, setVisVedlegg] = useState(false);

  const toggleVisVedleggMedTracking = (dokumentTittel, avsender) => (e) => {
    const hendelseData = {
      dokumentTittel,
      avsender,
      antallVedlegg: andreDokumenter.length,
    };

    visVedlegg
      ? logg.skjulteVedleggsliste(hendelseData)
      : logg.åpnetVedleggsliste(hendelseData);

    return toggleVisVedlegg(e);
  };

  const toggleVisVedlegg = (e) => {
    e.preventDefault();

    setVisVedlegg(!visVedlegg);
  };

  const localeString = new Date(dato).toLocaleString("no-NO", {
    dateStyle: "short",
  });
  const hovedDokument = finnHovedDokument(dokumenter);
  const andreDokumenter = finnVedlegg(dokumenter);
  const preview = finnForhåndsvisning(hovedDokument);

  const listDokumenter = () => {
    return andreDokumenter.map((dokument) => (
      <JournalpostDokument key={dokument.id} {...dokument} />
    ));
  };

  const getVedleggsKnappeTekst = () => {
    if (!visVedlegg) return `Vis vedlegg (${andreDokumenter.length})`;
    return `Skjul vedlegg (${andreDokumenter.length})`;
  };

  const avsender = hentAvsender({ journalposttype, brukerErAvsenderMottaker });

  const dokumentHendelse = {
    dokumentTittel: tittel,
    avsender,
  };
  const loggÅpnetForhåndsvisning = () =>
    logg.åpnetForhåndsvisning({
      ...dokumentHendelse,
    });
  const loggLukketForhåndsvisning = (visningstid) =>
    logg.lukketForhåndsvisning({
      ...dokumentHendelse,
      visningstid,
    });
  const loggÅpnetHvorforVisesIkkeDokumentet = () =>
    logg.åpnetHvorforVisesIkkeDokumentet(dokumentHendelse);
  const loggLastetNed = () => {
    logg.lastetNed(dokumentHendelse);
  };
  return (
    <>
      <article
        className={styles.article}
        aria-labelledby={`tittel-${journalpostId}`}
      >
        <div className={styles.journalpost}>
          <Undertekst style={{ color: "#6A6A6A" }}>
            <time dateTime={dato}>{localeString}</time> - {avsender}
          </Undertekst>
          <div className={styles.tittelKnappContainer}>
            <div className={styles.tittelBoks}>
              <Undertittel id={`tittel-${journalpostId}`}>
                {tittel || "Uten tittel"}
              </Undertittel>
            </div>
            {!hovedDokument.brukerHarTilgang && (
              <SkjultDokument
                onÅpneForklaring={loggÅpnetHvorforVisesIkkeDokumentet}
              />
            )}
            {hovedDokument.brukerHarTilgang && (
              <DokumentKnapper
                preview={preview}
                onLastNed={loggLastetNed}
                onOpenForhåndsvisning={loggÅpnetForhåndsvisning}
                onCloseForhåndsvisning={loggLukketForhåndsvisning}
              />
            )}
          </div>
          {andreDokumenter.length > 0 && (
            <>
              <DokumentListeKnapp
                tekst={getVedleggsKnappeTekst()}
                onClick={toggleVisVedleggMedTracking(tittel, avsender)}
                Ikon={visVedlegg ? Collapse : Expand}
                ariaExpanded={visVedlegg}
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
