import { Collapse, Expand } from "@navikt/ds-icons";
import { Detail, Heading } from "@navikt/ds-react";
import { useState } from "react";
import { useSanity } from "../../context/sanity-context";
import { logg } from "../../lib/amplitude";
import { hentAvsender } from "../../lib/avsenderMottaker";
import { Dokument, Journalpost, Link } from "../../pages/api/dokumenter";
import { InaccessibleDocument } from "../inaccessible-document/InaccessibleDocument";
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
  const [showAttechments, setShowAttechments] = useState(false);
  const { getAppText } = useSanity();

  function toggleVisVedleggMedTracking(dokumentTittel, avsender, e) {
    const hendelseData = {
      dokumentTittel,
      avsender,
      antallVedlegg: otherDocuments.length,
    };

    showAttechments
      ? logg.skjulteVedleggsliste(hendelseData)
      : logg.åpnetVedleggsliste(hendelseData);

    return toggleVisVedlegg(e);
  }

  function toggleVisVedlegg(e) {
    e.preventDefault();

    setShowAttechments(!showAttechments);
  }

  const localeString = new Date(dato).toLocaleString("no-NO", {
    dateStyle: "short",
  });

  const getMainDocument = (dokumenter: Dokument[]): Dokument =>
    dokumenter.filter((d) => d.type == "Hoved")[0];

  const getAttechments = (dokumenter: Dokument[]): Dokument[] =>
    dokumenter.filter((d) => d.type !== "Hoved");

  const getPreview = (dokument: Dokument): Link =>
    dokument.links.find((link) => link.rel == "preview");

  const mainDocument = getMainDocument(dokumenter);
  const otherDocuments = getAttechments(dokumenter);
  const preview = getPreview(mainDocument);

  const { tittel } = mainDocument;

  const getAttechmentsButtonText = () => {
    if (!showAttechments) {
      return `Vis vedlegg (${otherDocuments.length})`;
    }

    return `Skjul vedlegg (${otherDocuments.length})`;
  };

  const sender = hentAvsender({ journalposttype, brukerErAvsenderMottaker });

  const dokumentHendelse = {
    dokumentTittel: tittel,
    sender,
  };

  function logPreviewOpened() {
    logg.åpnetForhåndsvisning({
      ...dokumentHendelse,
    });
  }

  function logPreviewClosed(visningstid) {
    logg.lukketForhåndsvisning({
      ...dokumentHendelse,
      visningstid,
    });
  }

  function logWhyDocumentNotShowingClicked() {
    logg.åpnetHvorforVisesIkkeDokumentet(dokumentHendelse);
  }

  function logDocumentDownloaded() {
    logg.lastetNed(dokumentHendelse);
  }

  return (
    <>
      <article
        className={styles.article}
        aria-labelledby={`tittel-${journalpostId}`}
      >
        <div className={styles.journalpost}>
          <Detail>
            <time dateTime={dato}>{localeString}</time>- {sender}
          </Detail>
          <div className={styles.tittelKnappContainer}>
            <div className={styles.tittelBoks}>
              <Heading level="3" size="small" id={`tittel-${journalpostId}`}>
                {tittel || getAppText("tekst.journalpost.dokument-uten-tittel")}
              </Heading>
            </div>
            {!mainDocument.brukerHarTilgang && (
              <InaccessibleDocument
                showExplaination={logWhyDocumentNotShowingClicked}
              />
            )}
            {mainDocument.brukerHarTilgang && (
              <DocumentActionButtonsContainer
                preview={preview}
                onDownLoad={logDocumentDownloaded}
                onOpenPreview={logPreviewOpened}
                onClosePreview={logPreviewClosed}
              />
            )}
          </div>
          {otherDocuments.length > 0 && (
            <>
              <DocumentActionButton
                text={getAttechmentsButtonText()}
                onClick={(e) => toggleVisVedleggMedTracking(tittel, sender, e)}
                Ikon={showAttechments ? Collapse : Expand}
                ariaExpanded={showAttechments}
              />
              <div
                className={
                  showAttechments ? styles.visVedlegg : styles.skjulVedlegg
                }
              >
                {showAttechments && (
                  <>
                    {otherDocuments.map((dokument) => (
                      <JournalpostDocument key={dokument.id} {...dokument} />
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </article>
    </>
  );
}
