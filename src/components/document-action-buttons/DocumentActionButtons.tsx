import { DownloadIcon, FileSearchIcon } from "@navikt/aksel-icons";
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
  title: string;
  amplitudeEventData: DokumentHendelse;
}

export function DocumentActionButtons(props: IProps) {
  const { preview, amplitudeEventData } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const opened = useRef(null);
  const { getAppText } = useSanity();

  const logPreviewOpened = () => {
    logg.åpnetForhåndsvisning({
      ...amplitudeEventData,
    });
  };

  const logDocumentPreviewClosed = (previewTimestamp: number) => {
    logg.lukketForhåndsvisning({
      ...amplitudeEventData,
      visningstid: previewTimestamp,
    });
  };

  const logDocumentDownloaded = () => {
    logg.lastetNed({ ...amplitudeEventData });
  };

  useEffect(() => {
    if (modalIsOpen) {
      opened.current = new Date();
      logPreviewOpened();
    } else if (opened.current) {
      const previewTimestamp = Math.round((+new Date() - opened.current) / 1000);
      opened.current = null;
      logDocumentPreviewClosed(previewTimestamp);
    }
    // eslint-disable-next-line
  }, [modalIsOpen, logPreviewOpened, logDocumentDownloaded]);

  function handleDownload() {
    logDocumentDownloaded();
    const a = document.createElement("a");
    a.download = props.title;
    a.href = preview.href;
    a.click();
  }

  return (
    <div className={styles.documentActionButtons}>
      <Button
        variant="tertiary"
        size="small"
        icon={<DownloadIcon fontSize="1.5rem" aria-hidden />}
        onClick={handleDownload}
      >
        {getAppText("dokumenter.last-ned-pdf")}
      </Button>
      {PDFObject.supportsPDFs && (
        <>
          <Button
            variant="tertiary"
            size="small"
            icon={<FileSearchIcon fontSize="1.5rem" aria-hidden />}
            onClick={() => setModalIsOpen(true)}
          >
            {getAppText("dokumenter.forhaandvisning")}
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
