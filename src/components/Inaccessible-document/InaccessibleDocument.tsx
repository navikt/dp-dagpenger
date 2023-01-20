import { EyeScreened } from "@navikt/ds-icons";
import { Popover } from "@navikt/ds-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DocumentActionButton } from "../document-action-button/DocumentAcitionButton";
import styles from "./InaccessibleDocument.module.css";

interface IProps {
  showExplaination: () => void;
}

export default function InaccessibleDocument({ showExplaination }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    showExplaination();
  }, [isOpen]);

  const taKontaktUrl = "https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss";

  return (
    <div className={styles.inaccessibleDocumentContainer}>
      <DocumentActionButton
        text="Dokumentet kan ikke vises"
        Ikon={EyeScreened}
        disabled
      />
      <span ref={buttonRef}>
        <DocumentActionButton
          text="Hvorfor vises ikke dokumentet?"
          onClick={() => setIsOpen(true)}
        />
      </span>
      <Popover
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchorEl={buttonRef.current}
        placement="bottom"
      >
        <Popover.Content className={styles.explanationPopover}>
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
  );
}
