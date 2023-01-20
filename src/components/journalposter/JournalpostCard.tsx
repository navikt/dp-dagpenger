import { Collapse, Expand } from "@navikt/ds-icons";
import { Detail, Heading } from "@navikt/ds-react";
import { useState } from "react";
import { useSanity } from "../../context/sanity-context";
import { logg } from "../../lib/amplitude";
import { hentAvsender } from "../../lib/avsenderMottaker";
import { Dokument, Journalpost, Link } from "../../pages/api/dokumenter";
import { DocumentActionButton } from "../document-action-button/DocumentActionButton";
import { DocumentActionButtonsContainer } from "../document-action-buttons-container/DocumentActionButtonsContainer";
import { JournalpostDocument } from "./JournalpostDocument";
import styles from "./Journalposter.module.css";
import { HiddenDocument } from "../hidden-document/HiddenDocument";

export function JournalpostCard({
  journalpostId,
  dato,
  dokumenter,
  brukerErAvsenderMottaker,
  journalposttype,
}: Journalpost) {
  const [showAttechments, setShowAttechments] = useState(false);
  const { getAppText } = useSanity();

  function toggleShowAllAttechmentsWithTracking(dokumentTittel, avsender, e) {
    const eventData = {
      dokumentTittel,
      avsender,
      antallVedlegg: otherDocuments.length,
    };

    showAttechments
      ? logg.skjulteVedleggsliste(eventData)
      : logg.åpnetVedleggsliste(eventData);

    return toggleShowAttechments(e);
  }

  function toggleShowAttechments(e) {
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
      return `${getAppText("tekst.journalpost.vis-veglegg.knapp.tekst")} (${
        otherDocuments.length
      })`;
    }

    return `${getAppText("tekst.journalpost.skjul-veglegg.knapp.tekst")} (${
      otherDocuments.length
    })`;
  };

  const sender = hentAvsender({ journalposttype, brukerErAvsenderMottaker });

  const dokumentHendelse = {
    dokumentTittel: tittel,
    sender,
  };

  const logPreviewOpened = () => {
    logg.åpnetForhåndsvisning({
      ...dokumentHendelse,
    });
  };

  const logDocumentPreviewClosed = (visningstid) => {
    logg.lukketForhåndsvisning({
      ...dokumentHendelse,
      visningstid,
    });
  };

  const logUserClickedOnWhyDocumentNotShowing = () => {
    logg.åpnetHvorforVisesIkkeDokumentet(dokumentHendelse);
  };

  const logDocumentDownloaded = () => {
    logg.lastetNed(dokumentHendelse);
  };

  return (
    <>
      <article
        className={styles.jounalpostCardContainer}
        aria-labelledby={`tittel-${journalpostId}`}
      >
        <div className={styles.journalpostCard}>
          <Detail>
            <time dateTime={dato}>{localeString}</time> - {sender}
          </Detail>
          <div className={styles.journalpostCardInnerContainer}>
            <div className={styles.jounalpostCardContent}>
              <Heading level="3" size="small" id={`tittel-${journalpostId}`}>
                {tittel || getAppText("tekst.journalpost.dokument-uten-tittel")}
              </Heading>
            </div>
            {!mainDocument.brukerHarTilgang && (
              <HiddenDocument
                showExplaination={logUserClickedOnWhyDocumentNotShowing}
              />
            )}
            {mainDocument.brukerHarTilgang && (
              <DocumentActionButtonsContainer
                preview={preview}
                onDownLoad={logDocumentDownloaded}
                onOpenPreview={logPreviewOpened}
                onClosePreview={logDocumentPreviewClosed}
              />
            )}
          </div>
          {otherDocuments.length > 0 && (
            <>
              <DocumentActionButton
                text={getAttechmentsButtonText()}
                onClick={(e) =>
                  toggleShowAllAttechmentsWithTracking(tittel, sender, e)
                }
                Icon={showAttechments ? Collapse : Expand}
                ariaExpanded={showAttechments}
              />
              <div
                className={
                  showAttechments
                    ? styles.showAttechments
                    : styles.hideAttechments
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
