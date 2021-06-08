import { Dokument } from "../pages/api/dokumenter";
import React, { useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import ForhandsvisningModal from "./ForhandsvisningModal";
import DokumentListeKnapp from "./DokumentListeKnapp";
import { Download, Findout } from "@navikt/ds-icons";

export default function JournalpostDokument({ tittel, links }: Dokument) {
  const [vis, setVis] = useState(false);
  const preview = links.find((link) => link.rel == "preview");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <div className="wrapper">
        <Normaltekst style={{ flexGrow: 4 }}>{tittel}</Normaltekst>
        {vis && (
          <ForhandsvisningModal
            isOpen={vis}
            href={preview.href}
            close={() => setVis(false)}
          />
        )}
        <div className="knappe-container">
          <DokumentListeKnapp
            tekst="Last ned PDF"
            onClick={() => {
              console.log("TODO");
            }}
            Ikon={Download}
          />
          <DokumentListeKnapp
            tekst="Forhandsvisning"
            onClick={openModal}
            Ikon={Findout}
          />
          <ForhandsvisningModal
            isOpen={modalIsOpen}
            href={preview.href}
            close={() => closeModal()}
          />
        </div>
        <style jsx>{`
          .wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 10px;
            flex-wrap: wrap;
            border-top: 1px solid #c9c9c9;
            padding-top: 10px;
          }
          .wrap {
            min-width: 20rem;
            max-width: 60rem;
          }
          .buttons {
            width: min-content;
          }
          .knappe-container {
            margin: 0 10px;
          }
        `}</style>
      </div>
    </>
  );
}
