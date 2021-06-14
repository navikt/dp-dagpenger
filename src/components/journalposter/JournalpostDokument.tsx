import { Dokument } from "../../pages/api/dokumenter";
import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import styles from "./journalposter.module.css";
import SkjultDokument from "./SkjultDokument";
import { DokumentKnapper } from "./DokumentKnapper";

export default function JournalpostDokument({
  tittel,
  links,
  brukerHarTilgang,
}: Dokument) {
  const preview = links.find((link) => link.rel == "preview");

  return (
    <>
      <div className={styles.journalpostDokument}>
        <Normaltekst style={{ flexGrow: 4, fontWeight: "bold" }}>
          {tittel || "Uten tittel"}
        </Normaltekst>
        {!brukerHarTilgang && <SkjultDokument />}
        {brukerHarTilgang && <DokumentKnapper preview={preview} />}
      </div>
    </>
  );
}
