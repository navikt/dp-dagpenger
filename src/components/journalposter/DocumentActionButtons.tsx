import React, { useEffect, useRef, useState } from "react";
import styles from "./journalposter.module.css";
import DokumentListeKnapp from "./DokumentListeKnapp";
import { Download, Findout } from "@navikt/ds-icons";
import { kanVisePdf } from "../../lib/nettleser";
import ForhandsvisningModal from "./ForhandsvisningModal";
import { lastNedPdf } from "./JournalpostListe";
import { Link } from "../../pages/api/dokumenter";
import { useSanity } from "../../context/sanity-context";

interface IProps {
  preview: Link;
  onDownLoad: () => void;
  onOpenPreview: () => void;
  onClosePreview: (previewTimestamp: number) => void;
}

export function DocumentActionButtons(props: IProps) {
  const { preview, onDownLoad, onOpenPreview, onClosePreview } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const opened = useRef(null);
  const { getAppText } = useSanity();

  useEffect(() => {
    if (modalIsOpen) {
      opened.current = new Date();
      onOpenPreview();
    } else if (opened.current) {
      const previewTimestamp = Math.round(
        (+new Date() - opened.current) / 1000
      );
      opened.current = null;

      onClosePreview(previewTimestamp);
    }
  }, [modalIsOpen]);

  function handleDownload() {
    lastNedPdf(preview);
    onDownLoad();
  }

  return (
    <div className={styles.documentActionButtonsContainer}>
      <DokumentListeKnapp
        tekst={getAppText("tekst.dokumenter.last-ned-pdf")}
        onClick={handleDownload}
        Ikon={Download}
      />
      {kanVisePdf() && (
        <>
          <DokumentListeKnapp
            tekst={getAppText("tekst.dokumenter.forhaandvisning")}
            onClick={() => setModalIsOpen(true)}
            Ikon={Findout}
          />
          {modalIsOpen && (
            <ForhandsvisningModal
              isOpen={modalIsOpen}
              href={preview.href}
              close={() => setModalIsOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
