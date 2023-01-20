import { EyeScreened } from "@navikt/ds-icons";
import { Popover } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useEffect, useRef, useState } from "react";
import { useSanity } from "../../context/sanity-context";
import { DocumentActionButton } from "../document-action-button/DocumentAcitionButton";
import styles from "./InaccessibleDocument.module.css";

interface IProps {
  showExplaination: () => void;
}

export default function InaccessibleDocument({ showExplaination }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { getAppText, getRichText } = useSanity();

  useEffect(() => {
    if (!isOpen) return;

    showExplaination();
  }, [isOpen]);

  return (
    <div className={styles.inaccessibleDocumentContainer}>
      <DocumentActionButton
        text={getAppText("tekst.skjult-dokument.kan-ikke-vises")}
        Ikon={EyeScreened}
        disabled
      />
      <span ref={buttonRef}>
        <DocumentActionButton
          text={getAppText(
            "tekst.skjult-dokument.hvorfor-vises-ikke-dokumentet"
          )}
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
          <PortableText
            value={getRichText("rik-tekst.skjult-dokumenter.forklaringstekst")}
          />
        </Popover.Content>
      </Popover>
    </div>
  );
}
