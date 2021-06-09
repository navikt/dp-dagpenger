import { Dokument } from "../../pages/api/dokumenter";
import React, { useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import ForhandsvisningModal from "./ForhandsvisningModal";
import DokumentListeKnapp from "./DokumentListeKnapp";
import { Download, Findout } from "@navikt/ds-icons";
import styles from "./journalposter.module.css";
import SkjultDokument from "./SkjultDokument";
import { lastNedPdf } from "./JournalpostListe";

export default function JournalpostDokument({
  tittel,
  links,
  brukerHarTilgang,
}: Dokument) {
  const preview = links.find((link) => link.rel == "preview");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <div className={styles.journalpostDokument}>
        <Normaltekst style={{ flexGrow: 4 }}>{tittel}</Normaltekst>
        {!brukerHarTilgang && <SkjultDokument />}
        {brukerHarTilgang && (
          <div className={styles.knappeContainer}>
            <DokumentListeKnapp
              tekst="Last ned PDF"
              onClick={lastNedPdf(preview)}
              Ikon={Download}
            />
            <DokumentListeKnapp
              tekst="Forhandsvisning"
              onClick={openModal}
              Ikon={Findout}
            />
            {modalIsOpen && (
              <ForhandsvisningModal
                isOpen={modalIsOpen}
                href={preview.href}
                close={() => closeModal()}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
