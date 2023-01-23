import { Download, Findout } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import PDFObject from "pdfobject";
import { useEffect, useRef, useState } from "react";
import { useSanity } from "../../context/sanity-context";
import { DokumentHendelse, logg } from "../../lib/amplitude";
import { Link } from "../../pages/api/dokumenter";
import { PreviewModal } from "../preview-modal/PreviewModal";
import styles from "./DocumentActionButtons.module.css";

interface IProps {
  preview: Link;
  amplitudeEventData: DokumentHendelse;
}

export function DocumentActionButtons(props: IProps) {
  const { preview, amplitudeEventData } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const opened = useRef(null);
  const { getAppText } = useSanity();

  useEffect(() => {
    if (modalIsOpen) {
      opened.current = new Date();

      logg.åpnetForhåndsvisning({
        ...amplitudeEventData,
      });
    } else if (opened.current) {
      const previewTimestamp = Math.round(
        (+new Date() - opened.current) / 1000
      );
      opened.current = null;

      logg.lukketForhåndsvisning({
        ...amplitudeEventData,
        visningstid: previewTimestamp,
      });
    }
  }, [modalIsOpen, amplitudeEventData]);

  function handleDownload() {
    logDocumentDownloaded();
    const a = document.createElement("a");
    a.download = String("true");
    a.href = preview.href;
    a.click();
  }

  const logDocumentDownloaded = () => {
    logg.lastetNed({ ...amplitudeEventData });
  };

  return (
    <div className={styles.documentActionButtons}>
      <Button
        variant="tertiary"
        size="small"
        icon={<Download aria-hidden />}
        onClick={handleDownload}
      >
        {getAppText("tekst.dokumenter.last-ned-pdf")}
      </Button>
      {PDFObject.supportsPDFs && (
        <>
          <Button
            variant="tertiary"
            size="small"
            icon={<Findout aria-hidden />}
            onClick={() => setModalIsOpen(true)}
          >
            {getAppText("tekst.dokumenter.forhaandvisning")}
          </Button>
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
