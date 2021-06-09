import ModalWrapper from "nav-frontend-modal";
import React, { useEffect, useRef } from "react";
import "nav-frontend-lukknapp-style/dist/main.css";
import "nav-frontend-modal-style/dist/main.css";
import PDFObject from "pdfobject";

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
    <ModalWrapper
      isOpen={isOpen}
      closeButton={true}
      contentLabel="Forhåndsvisning"
      onRequestClose={close}
    >
      <EmbeddedPDF href={href} />
    </ModalWrapper>
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
