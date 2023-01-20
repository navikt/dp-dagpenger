import { Collapse, Expand } from "@navikt/ds-icons";
import { Detail, Heading } from "@navikt/ds-react";
import { useState } from "react";
import { useSanity } from "../../context/sanity-context";
import { logg } from "../../lib/amplitude";
import { hentAvsender } from "../../lib/avsenderMottaker";
import { Dokument, Journalpost, Link } from "../../pages/api/dokumenter";
import InaccessibleDocument from "../Inaccessible-document/InaccessibleDocument";
import { DocumentActionButton } from "../document-action-button/DocumentAcitionButton";
import { DocumentActionButtonsContainer } from "../document-action-buttons-container/DocumentActionButtonsContainer";
import { JournalpostDocument } from "./JournalpostDocument";
import styles from "./Journalposter.module.css";

export function JournalpostCard({
  journalpostId,
  dato,
  dokumenter,
  brukerErAvsenderMottaker,
  journalposttype,
}: Journalpost) {
  const [visVedlegg, setVisVedlegg] = useState(false);
  const { getAppText } = useSanity();

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

  const finnHovedDokument = (dokumenter: Dokument[]): Dokument =>
    dokumenter.filter((d) => d.type == "Hoved")[0];
  const finnVedlegg = (dokumenter: Dokument[]): Dokument[] =>
    dokumenter.filter((d) => d.type !== "Hoved");
  const finnForhåndsvisning = (dokument: Dokument): Link =>
    dokument.links.find((link) => link.rel == "preview");

  const hovedDokument = finnHovedDokument(dokumenter);
  const andreDokumenter = finnVedlegg(dokumenter);
  const preview = finnForhåndsvisning(hovedDokument);

  const { tittel } = hovedDokument;

  const listDokumenter = () => {
    return andreDokumenter.map((dokument) => (
      <JournalpostDocument key={dokument.id} {...dokument} />
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
          <Detail>
            <time dateTime={dato}>{localeString}</time>- {avsender}
          </Detail>
          <div className={styles.tittelKnappContainer}>
            <div className={styles.tittelBoks}>
              <Heading level="3" size="small" id={`tittel-${journalpostId}`}>
                {tittel || getAppText("tekst.journalpost.dokument-uten-tittel")}
              </Heading>
            </div>
            {!hovedDokument.brukerHarTilgang && (
              <InaccessibleDocument
                showExplaination={loggÅpnetHvorforVisesIkkeDokumentet}
              />
            )}
            {hovedDokument.brukerHarTilgang && (
              <DocumentActionButtonsContainer
                preview={preview}
                onDownLoad={loggLastetNed}
                onOpenPreview={loggÅpnetForhåndsvisning}
                onClosePreview={loggLukketForhåndsvisning}
              />
            )}
          </div>
          {andreDokumenter.length > 0 && (
            <>
              <DocumentActionButton
                text={getVedleggsKnappeTekst()}
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
