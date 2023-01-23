import { EyeScreened } from "@navikt/ds-icons";
import { Button, Popover } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useRef, useState } from "react";
import { useSanity } from "../../context/sanity-context";
import { DokumentHendelse, logg } from "../../lib/amplitude";
import styles from "./HiddenDocument.module.css";

interface IProps {
  amplitudeEventData: DokumentHendelse;
}

export function HiddenDocument({ amplitudeEventData }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getAppText, getRichText } = useSanity();
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleOpenPopover() {
    setIsOpen(true);
    logg.åpnetHvorforVisesIkkeDokumentet(amplitudeEventData);
  }

  return (
    <div className={styles.hiddenDocumentContainer}>
      <p className={styles.hiddenDocumentLabel}>
        <EyeScreened aria-hidden className={styles.hiddenDocumentIcon} />
        {getAppText("tekst.skjult-dokument.kan-ikke-vises")}
      </p>

      <Button
        ref={buttonRef}
        variant="tertiary"
        size="small"
        onClick={handleOpenPopover}
      >
        {getAppText("tekst.skjult-dokument.hvorfor-vises-ikke-dokumentet")}
      </Button>
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
