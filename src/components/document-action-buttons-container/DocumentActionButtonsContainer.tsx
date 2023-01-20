import { Download, Findout } from "@navikt/ds-icons";
import PDFObject from "pdfobject";
import { useEffect, useRef, useState } from "react";
import { useSanity } from "../../context/sanity-context";
import { Link } from "../../pages/api/dokumenter";
import { DocumentActionButton } from "../document-action-button/DocumentActionButton";
import PreviewModal from "../preview-modal/PreviewModal";
import styles from "./DocumentActionButtonsContainer.module.css";

interface IProps {
  preview: Link;
  onDownLoad: () => void;
  onOpenPreview: () => void;
  onClosePreview: (previewTimestamp: number) => void;
}

export function DocumentActionButtonsContainer(props: IProps) {
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
    const a = document.createElement("a");
    a.download = String("true");
    a.href = preview.href;
    a.click();
  }

  return (
    <div className={styles.documentActionButtonsContainer}>
      <DocumentActionButton
        text={getAppText("tekst.dokumenter.last-ned-pdf")}
        onClick={handleDownload}
        Icon={Download}
      />
      {PDFObject.supportsPDFs && (
        <>
          <DocumentActionButton
            text={getAppText("tekst.dokumenter.forhaandvisning")}
            onClick={() => setModalIsOpen(true)}
            Icon={Findout}
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
