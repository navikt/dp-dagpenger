import { BodyShort } from "@navikt/ds-react";
import { logg } from "../../lib/amplitude";
import { Dokument } from "../../pages/api/dokumenter";
import { DocumentActionButtonsContainer } from "../document-action-buttons-container/DocumentActionButtonsContainer";
import styles from "./journalposter.module.css";
import { useSanity } from "../../context/sanity-context";
import { HiddenDocument } from "../hidden-document/HiddenDocument";

export function JournalpostDocument({
  tittel,
  links,
  brukerHarTilgang,
}: Dokument) {
  const preview = links.find((link) => link.rel == "preview");
  const { getAppText } = useSanity();

  function logDocumentPreviewOpened() {
    logg.åpnetForhåndsvisning({
      dokumentTittel: tittel,
    });
  }

  function logDocumentPreviewClosed(visningstid) {
    logg.lukketForhåndsvisning({
      dokumentTittel: tittel,
      visningstid,
    });
  }

  function logUserClickedOnWhyDocumentNotShowing() {
    logg.åpnetHvorforVisesIkkeDokumentet({
      dokumentTittel: tittel,
    });
  }

  function logDocumentDownloaded() {
    logg.lastetNed({ dokumentTittel: tittel });
  }

  return (
    <div className={styles.journalpostDocument}>
      <BodyShort style={{ flexGrow: 4, fontWeight: "bold" }}>
        {tittel || getAppText("tekst.journalpost.dokument-uten-tittel")}
      </BodyShort>
      {!brukerHarTilgang && (
        <HiddenDocument
          showExplaination={logUserClickedOnWhyDocumentNotShowing}
        />
      )}
      {brukerHarTilgang && (
        <DocumentActionButtonsContainer
          preview={preview}
          onDownLoad={logDocumentDownloaded}
          onOpenPreview={logDocumentPreviewOpened}
          onClosePreview={logDocumentPreviewClosed}
        />
      )}
    </div>
  );
}
