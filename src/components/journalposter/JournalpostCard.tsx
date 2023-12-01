import { Detail, Heading } from "@navikt/ds-react";
import { useSanity } from "../../context/sanity-context";
import { DokumentHendelse } from "../../lib/amplitude";
import { hentAvsender } from "../../lib/avsenderMottaker";
import { Dokument, Journalpost, Link } from "../../pages/api/dokumenter";
import { DocumentActionButtons } from "../document-action-buttons/DocumentActionButtons";
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

  const amplitudeEventData: DokumentHendelse = {
    dokumentTittel: tittel,
    sender,
  };

  return (
    <article className={styles.journalpostCard} aria-labelledby={`tittel-${journalpostId}`}>
      <Detail>
        <time dateTime={dato}>{localeString}</time> - {sender}
      </Detail>
      <div className={styles.journalpostCardContainer}>
        <div className={styles.journalpostCardContent}>
          <Heading level="3" size="small" id={`tittel-${journalpostId}`}>
            {tittel || getAppText("journalpost.dokument-uten-tittel")}
          </Heading>
        </div>
        {!mainDocument.brukerHarTilgang && (
          <HiddenDocument amplitudeEventData={amplitudeEventData} />
        )}
        {mainDocument.brukerHarTilgang && (
          <DocumentActionButtons preview={preview} amplitudeEventData={amplitudeEventData} />
        )}
      </div>
      {attachments.length > 0 && (
        <ExpandableAttachmentsList
          attachments={attachments}
          title={tittel}
          amplitudeEventData={amplitudeEventData}
        />
      )}
    </article>
  );
}
