import { Dokument } from "../../pages/api/dokumenter";
import React, { useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import ForhandsvisningModal from "./ForhandsvisningModal";
import DokumentListeKnapp from "./DokumentListeKnapp";
import { Download, Findout } from "@navikt/ds-icons";
import styles from "./journalposter.module.css";
import SkjultDokument from "./SkjultDokument";
import { lastNedPdf } from "./JournalpostListe";
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
        <Normaltekst style={{ flexGrow: 4 }}>{tittel}</Normaltekst>
        {!brukerHarTilgang && <SkjultDokument />}
        {brukerHarTilgang && <DokumentKnapper preview={preview} />}
      </div>
    </>
  );
}
