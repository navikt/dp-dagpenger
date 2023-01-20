import { BodyShort } from "@navikt/ds-react";
import { logg } from "../../lib/amplitude";
import { Dokument } from "../../pages/api/dokumenter";
import InaccessibleDocument from "../Inaccessible-document/InaccessibleDocument";
import { DocumentActionButtonsContainer } from "../document-action-buttons-container/DocumentActionButtonsContainer";
import styles from "./journalposter.module.css";

export default function JournalpostDokument({
  tittel,
  links,
  brukerHarTilgang,
}: Dokument): JSX.Element {
  const preview = links.find((link) => link.rel == "preview");

  const loggÅpnetForhåndsvisning = () =>
    logg.åpnetForhåndsvisning({
      dokumentTittel: tittel,
    });

  const loggLukketForhåndsvisning = (visningstid) =>
    logg.lukketForhåndsvisning({
      dokumentTittel: tittel,
      visningstid,
    });

  const loggÅpnetHvorforVisesIkkeDokumentet = () =>
    logg.åpnetHvorforVisesIkkeDokumentet({
      dokumentTittel: tittel,
    });

  const loggLastetNed = () => {
    logg.lastetNed({ dokumentTittel: tittel });
  };

  return (
    <>
      <div className={styles.journalpostDokument}>
        <BodyShort style={{ flexGrow: 4, fontWeight: "bold" }}>
          {tittel || "Uten tittel"}
        </BodyShort>
        {!brukerHarTilgang && (
          <InaccessibleDocument
            showExplaination={loggÅpnetHvorforVisesIkkeDokumentet}
          />
        )}
        {brukerHarTilgang && (
          <DocumentActionButtonsContainer
            preview={preview}
            onDownLoad={loggLastetNed}
            onOpenPreview={loggÅpnetForhåndsvisning}
            onClosePreview={loggLukketForhåndsvisning}
          />
        )}
      </div>
    </>
  );
}
