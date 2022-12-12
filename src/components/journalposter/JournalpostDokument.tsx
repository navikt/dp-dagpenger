import React from "react";
import styles from "./journalposter.module.css";
import SkjultDokument from "./SkjultDokument";
import { DokumentKnapper } from "./DokumentKnapper";
import { logg } from "../../lib/amplitude";
import { Dokument } from "../../pages/api/dokumenter";
import { BodyShort } from "@navikt/ds-react";

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
          <SkjultDokument
            onÅpneForklaring={loggÅpnetHvorforVisesIkkeDokumentet}
          />
        )}
        {brukerHarTilgang && (
          <DokumentKnapper
            preview={preview}
            onLastNed={loggLastetNed}
            onOpenForhåndsvisning={loggÅpnetForhåndsvisning}
            onCloseForhåndsvisning={loggLukketForhåndsvisning}
          />
        )}
      </div>
    </>
  );
}
