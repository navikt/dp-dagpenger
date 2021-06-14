import React, { useEffect, useRef, useState } from "react";
import styles from "./journalposter.module.css";
import DokumentListeKnapp from "./DokumentListeKnapp";
import { Download, Findout } from "@navikt/ds-icons";
import { kanVisePdf } from "../../utilities/nettleser";
import ForhandsvisningModal from "./ForhandsvisningModal";
import { lastNedPdf, Link } from "./JournalpostListe";

export function DokumentKnapper({
  preview,
  onLastNed,
  onOpenForhåndsvisning,
  onCloseForhåndsvisning,
}: {
  preview: Link;
  onLastNed: () => void;
  onOpenForhåndsvisning: () => void;
  onCloseForhåndsvisning: (visningstid: number) => void;
}): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const åpnet = useRef(null);
  useEffect(() => {
    if (modalIsOpen) {
      åpnet.current = new Date();
      onOpenForhåndsvisning();
    } else if (åpnet.current) {
      const visningstid = Math.round((+new Date() - åpnet.current) / 1000);
      åpnet.current = null;

      onCloseForhåndsvisning(visningstid);
    }
  }, [modalIsOpen]);

  const handleLastNed = () => {
    lastNedPdf(preview);
    onLastNed();
  };
  return (
    <div className={styles.knappeContainer}>
      <DokumentListeKnapp
        tekst="Last ned PDF"
        onClick={handleLastNed}
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
