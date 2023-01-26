import PDFObject from "pdfobject";
import { useEffect, useRef } from "react";
import styles from "./EmbeddedPDF.module.css";

interface IProps {
  href: string;
}

export function EmbeddedPDF({ href }: IProps) {
  const embed = useRef(null);

  useEffect(() => {
    PDFObject.embed(href, embed.current);
  }, [href]);

  return <div className={styles.embeddedPDFContainer} ref={embed} />;
}
