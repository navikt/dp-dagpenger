import { BodyShort } from "@navikt/ds-react";
import { useSanity } from "../../context/sanity-context";
import { logg } from "../../lib/amplitude";
import { Dokument } from "../../pages/api/dokumenter";
import { DocumentActionButtonsContainer } from "../document-action-buttons-container/DocumentActionButtonsContainer";
import { HiddenDocument } from "../hidden-document/HiddenDocument";
import styles from "./Jounalposter.module.css";

export function JournalpostDocument({
  tittel,
  links,
  brukerHarTilgang,
}: Dokument) {
  const preview = links.find((link) => link.rel == "preview");
  const { getAppText } = useSanity();

  const logDocumentPreviewOpened = () => {
    logg.åpnetForhåndsvisning({
      dokumentTittel: tittel,
    });
  };

  const logDocumentPreviewClosed = (visningstid) => {
    logg.lukketForhåndsvisning({
      dokumentTittel: tittel,
      visningstid,
    });
  };

  const logUserClickedOnWhyDocumentNotShowing = () => {
    logg.åpnetHvorforVisesIkkeDokumentet({
      dokumentTittel: tittel,
    });
  };

  const logDocumentDownloaded = () => {
    logg.lastetNed({ dokumentTittel: tittel });
  };

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
