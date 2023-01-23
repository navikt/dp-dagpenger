import { Detail, Heading } from "@navikt/ds-react";
import { useSanity } from "../../context/sanity-context";
import { logg } from "../../lib/amplitude";
import { hentAvsender } from "../../lib/avsenderMottaker";
import { Dokument, Journalpost, Link } from "../../pages/api/dokumenter";
import { DocumentActionButtonsContainer } from "../document-action-buttons-container/DocumentActionButtonsContainer";
import { ExpandableAttachmentsList } from "../expandable-attachments-list/ExpandableAttachmentsList";
import { HiddenDocument } from "../hidden-document/HiddenDocument";
import styles from "./Jounalposter.module.css";

export function JournalpostCard({
  journalpostId,
  dato,
  dokumenter,
  brukerErAvsenderMottaker,
  journalposttype,
}: Journalpost) {
  const { getAppText } = useSanity();

  const localeString = new Date(dato).toLocaleString("no-NO", {
    dateStyle: "short",
  });

  function getMainDocument(dokumenter: Dokument[]): Dokument {
    return dokumenter.filter((d) => d.type == "Hoved")[0];
  }

  function getAttechments(dokumenter: Dokument[]): Dokument[] {
    return dokumenter.filter((d) => d.type !== "Hoved");
  }

  function getPreview(dokument: Dokument): Link {
    return dokument.links.find((link) => link.rel == "preview");
  }

  const mainDocument = getMainDocument(dokumenter);
  const attachments = getAttechments(dokumenter);
  const preview = getPreview(mainDocument);

  const { tittel } = mainDocument;
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
    <article
      className={styles.jounalpostCard}
      aria-labelledby={`tittel-${journalpostId}`}
    >
      <Detail>
        <time dateTime={dato}>{localeString}</time> - {sender}
      </Detail>
      <div className={styles.journalpostCardContainer}>
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
      {attachments.length > 0 && (
        <ExpandableAttachmentsList
          attachments={attachments}
          title={tittel}
          sender={sender}
        />
      )}
    </article>
  );
}
