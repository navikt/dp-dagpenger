import { EyeScreened } from "@navikt/ds-icons";
import React, { useEffect, useRef, useState } from "react";
import styles from "./journalposter.module.css";
import DocumentListButton from "./DocumentListButton";
import Link from "next/link";
import { Popover } from "@navikt/ds-react";

interface Props {
  onÅpneForklaring: () => void;
}

export default function SkjultDokument({
  onÅpneForklaring = () => {
    /* do nothing */
  },
}: Props): JSX.Element {
  const [openState, setOpenState] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!openState) return;
    onÅpneForklaring();
  }, [openState]);

  const taKontaktUrl = "https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss";

  return (
    <>
      <div className={styles.knappeContainer}>
        <DocumentListButton
          text="Dokumentet kan ikke vises"
          Ikon={EyeScreened}
          disabled
        />
        <span ref={buttonRef}>
          <DocumentListButton
            text="Hvorfor vises ikke dokumentet?"
            onClick={() => setOpenState(true)}
          />
        </span>
        <Popover
          open={openState}
          onClose={() => setOpenState(false)}
          anchorEl={buttonRef.current}
          placement="bottom"
        >
          <Popover.Content className={styles.popoverInnhold}>
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
              <Link href={taKontaktUrl}>Ta kontakt</Link> dersom du trenger
              informasjon om dokumentene.
            </p>
          </Popover.Content>
        </Popover>
      </div>
    </>
  );
}
