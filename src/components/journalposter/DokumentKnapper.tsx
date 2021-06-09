import { Link } from "../../pages/api/dokumenter";
import React, { useState } from "react";
import styles from "./journalposter.module.css";
import DokumentListeKnapp from "./DokumentListeKnapp";
import { Download, Findout } from "@navikt/ds-icons";
import { kanVisePdf } from "../../utilities/nettleser";
import ForhandsvisningModal from "./ForhandsvisningModal";
import { lastNedPdf } from "./JournalpostListe";

export function DokumentKnapper({ preview }: { preview: Link }): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className={styles.knappeContainer}>
      <DokumentListeKnapp
        tekst="Last ned PDF"
        onClick={lastNedPdf(preview)}
        Ikon={Download}
      />
      {kanVisePdf() && (
        <>
          <DokumentListeKnapp
            tekst="Forhåndsvisning"
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
        </>
      )}
    </div>
  );
}
