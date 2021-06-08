import { EyeScreened } from "@navikt/ds-icons";
import Popover from "nav-frontend-popover";
import { Element } from "nav-frontend-typografi";
import React, { useState } from "react";
import "nav-frontend-popover-style/dist/main.css";
import styles from "./journalposter.module.css";

export default function SkjultDokument() {
  const [ankerElement, setAnkerElement] = useState(undefined);

  return (
    <div className={styles.knappeContainer}>
      <Element>
        <EyeScreened /> Dokumentet kan ikke vises
      </Element>
      <button onClick={(e) => setAnkerElement(e.currentTarget)}>
        Hvorfor kan jeg ikke se dokumentet?
      </button>
      <Popover
        ankerEl={ankerElement}
        onRequestClose={() => setAnkerElement(undefined)}
      >
        <p>Vi har ikke løsninger for å vise:</p>
        <ul>
          <li>Dokumenter som du har sendt via vanlig post til NAV.</li>
          <li>
            Dokumenter som en tredjepart (leger/andre behandlere, advokater,
            verger, fullmektiger og lignende) har sendt inn, og som angår saken
            din.
          </li>
        </ul>
        <p>Ta kontakt dersom du trenger informasjon om dokumentene.</p>
      </Popover>
    </div>
  );
}
