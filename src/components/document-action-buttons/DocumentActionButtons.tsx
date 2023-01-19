import { Download, Findout } from "@navikt/ds-icons";
import { useEffect, useRef, useState } from "react";
import { useSanity } from "../../context/sanity-context";
import { kanVisePdf } from "../../lib/nettleser";
import { Link } from "../../pages/api/dokumenter";
import DocumentListButton from "../journalposter/DocumentListButton";
import { lastNedPdf } from "../journalposter/JournalpostListe";
import PreviewModal from "../preview-modal/PreviewModal";
import styles from "./DocumentActionButtons.module.css";

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
      <DocumentListButton
        text={getAppText("tekst.dokumenter.last-ned-pdf")}
        onClick={handleDownload}
        Ikon={Download}
      />
      {kanVisePdf() && (
        <>
          <DocumentListButton
            text={getAppText("tekst.dokumenter.forhaandvisning")}
            onClick={() => setModalIsOpen(true)}
            Ikon={Findout}
          />
          {modalIsOpen && (
            <PreviewModal
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
