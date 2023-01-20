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
          {tittel || getAppText("tekst.journalpost.dokument-uten-tittel")}
        </BodyShort>
        {!brukerHarTilgang && (
          <HiddenDocument
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
