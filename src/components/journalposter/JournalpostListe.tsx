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
import { hentAvsender } from "../../lib/avsenderMottaker";
import { logg } from "../../lib/amplitude";
import { Dokument, Journalpost, Link } from "../../pages/api/dokumenter";
import { Flatknapp } from "nav-frontend-knapper";
import api from "../../lib/api";

function useDokumentListe() {
  const { data, error } = useSWR<Journalpost[]>(api(`/dokumenter`));

  return {
    journalposter: data,
    isLoading: !error && !data,
    isError: error,
  };
}

const finnHovedDokument = (dokumenter: Dokument[]): Dokument =>
  dokumenter.filter((d) => d.type == "Hoved")[0];
const finnVedlegg = (dokumenter: Dokument[]): Dokument[] =>
  dokumenter.filter((d) => d.type !== "Hoved");
const finnForhåndsvisning = (dokument: Dokument): Link =>
  dokument.links.find((link) => link.rel == "preview");

function useTrackingVistDokumentlisten(journalposter: Journalpost[]) {
  const isFirstTracking = useRef(true);
  useEffect(() => {
    if (!journalposter) return;
    if (!isFirstTracking.current) return;
    isFirstTracking.current = false;

    const antallDagpenger = journalposter.filter((d) => d.tema == "DAG").length;
    const antallOppfølging = journalposter.filter(
      (d) => d.tema == "OPP"
    ).length;
    const søknader = journalposter.filter((d) => d.tittel?.match(/søknad/i));
    const antallDagerSidenSøknad = søknader.length
      ? antallDagerSiden(new Date(søknader[0].dato))
      : null;

    logg.vistDokumentlisten({
      antallDagpenger,
      antallOppfølging,
      antallSøknader: søknader.length,
      antallDagerSidenSøknad,
    });

    function antallDagerSiden(dato: Date): number {
      return Math.round((Date.now() - +dato) / 1000 / 60 / 60 / 24);
    }
  }, [journalposter]);
}

const antallJournalposterFørsteVisning = 10;

export default function JournalpostListe(): JSX.Element {
  const [visAlle, setVisAlle] = useState(false);
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

  const klikkVisAlle = () => {
    setVisAlle(!visAlle);
    logg.klikketVisAlleDokumenter({ antallDokumenter: journalposter.length });
  };

  const journalposterTilVisning = journalposter.slice(
    0,
    visAlle ? journalposter.length : antallJournalposterFørsteVisning
  );

  return (
    <>
      {journalposterTilVisning.map((journalpost) => (
        <JournalpostUtlisting
          key={journalpost.journalpostId}
          {...journalpost}
        />
      ))}
      {!visAlle && journalposter.length > antallJournalposterFørsteVisning && (
        <div className={styles.visAlleKnapp}>
          <Flatknapp style={{ textTransform: "none" }} onClick={klikkVisAlle}>
            Vis alle dokumenter ({journalposter.length})
          </Flatknapp>
        </div>
      )}
    </>
  );
}

export const lastNedPdf = (preview: Link) => {
  const a = document.createElement("a");
  a.download = String("true");
  a.href = preview.href;
  a.click();
};

function JournalpostUtlisting({
  journalpostId,
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

  const { tittel } = hovedDokument;

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
            <time dateTime={dato}>{localeString}</time>- {avsender}
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
