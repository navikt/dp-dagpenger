import React, { useEffect, useRef } from "react";
import PDFObject from "pdfobject";
import { Modal } from "@navikt/ds-react";

export default function ForhandsvisningModal({
  href,
  close,
  isOpen,
}: {
  href: string;
  close: () => void;
  isOpen: boolean;
}): JSX.Element {
  // TODO: Vi må sette appElement på modalen for skjermlesere
  return (
    <Modal open={isOpen} onClose={close}>
      <EmbeddedPDF href={href} />
    </Modal>
  );
}

function EmbeddedPDF({ href }: { href: string }): JSX.Element {
  const embed = useRef(null);

  useEffect(() => {
    PDFObject.embed(href, embed.current);
  }, [href]);

  return (
    <>
      <div ref={embed}></div>
      <style jsx>{`
        div {
          height: 70vh;
          width: 60vw;
        }

        @media screen and (max-width: 1024px) {
          div {
            height: 100%;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
