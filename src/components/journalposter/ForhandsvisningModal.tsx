import ModalWrapper from "nav-frontend-modal";
import React from "react";
import "nav-frontend-lukknapp-style/dist/main.css";
import "nav-frontend-modal-style/dist/main.css";

export default function ForhandsvisningModal({
  href,
  close,
  isOpen,
}: {
  href: string;
  close: () => void;
  isOpen: boolean;
}): JSX.Element {
  return (
    <ModalWrapper
      isOpen={isOpen}
      closeButton={true}
      contentLabel="Forhåndsvisning"
      onRequestClose={close}
    >
      <embed src={href} />
      <style jsx>{`
        embed {
          height: 70vh;
          width: 60vw;
        }

        @media screen and (max-width: 1024px) {
          embed {
            height: 100%;
            width: 100%;
          }
        }
      `}</style>
    </ModalWrapper>
  );
}
