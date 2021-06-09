import { EyeScreened } from "@navikt/ds-icons";
import Popover, { PopoverOrientering } from "nav-frontend-popover";
import React, { useState } from "react";
import "nav-frontend-popover-style/dist/main.css";
import styles from "./journalposter.module.css";
import DokumentListeKnapp from "./DokumentListeKnapp";
import Lenke from "nav-frontend-lenker";

export default function SkjultDokument(): JSX.Element {
  const [ankerElement, setAnkerElement] = useState(undefined);

  const taKontaktUrl = "https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss";

  return (
    <>
      <div className={styles.knappeContainer}>
        <DokumentListeKnapp
          tekst="Dokumentet kan ikke vises"
          Ikon={EyeScreened}
          disabled
        />
        <DokumentListeKnapp
          tekst="Hvorfor vises ikke dokumentet?"
          onClick={(e) => setAnkerElement(e.currentTarget)}
        />
        <Popover
          ankerEl={ankerElement}
          orientering={PopoverOrientering.UnderHoyre}
          onRequestClose={() => setAnkerElement(undefined)}
        >
          <div className="popoverInnhold">
            <p>Vi har ikke løsninger for å vise:</p>
            <ul>
              <li>Dokumenter som du har sendt via vanlig post til NAV.</li>
              <li>
                Dokumenter som en tredjepart (leger/andre behandlere, advokater,
                verger, fullmektiger og lignende) har sendt inn, og som angår
                saken din.
              </li>
            </ul>
            <p>
              <Lenke href={taKontaktUrl}>Ta kontakt</Lenke> dersom du trenger
              informasjon om dokumentene.
            </p>
          </div>
        </Popover>
      </div>
      <style jsx>{`
        .info {
          display: flex;
        }
        .popoverInnhold {
          max-width: 700px;
          padding: 20px;
        }

        .popoverInnhold p {
          margin: 0;
        }
      `}</style>
    </>
  );
}
