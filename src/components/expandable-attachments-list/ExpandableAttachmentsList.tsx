import { ChevronDownIcon } from "@navikt/aksel-icons";
import classNames from "classnames";
import { useState } from "react";
import { useSanity } from "../../context/sanity-context";
import { DokumentHendelse, logg } from "../../lib/amplitude";
import { Dokument } from "../../pages/api/dokumenter";
import { Attachment } from "../attachment/Attachment";
import styles from "./ExpandableAttchmentsList.module.css";

interface IProps {
  attachments: Dokument[];
  title: string;
  amplitudeEventData: DokumentHendelse;
}

export function ExpandableAttachmentsList({ attachments, title, amplitudeEventData }: IProps) {
  const { getAppText } = useSanity();
  const [expanded, setExpanded] = useState(false);

  function handleExpand(documentTitle, sender) {
    const eventData = {
      dokumentTittel: documentTitle,
      avsender: sender,
      antallVedlegg: attachments.length,
    };

    expanded ? logg.skjulteVedleggsliste(eventData) : logg.åpnetVedleggsliste(eventData);

    setExpanded(!expanded);
  }

  function getAttechmentsButtonText() {
    if (!expanded) {
      return `${getAppText("journalpost.vis-veglegg.knapp.tekst")} (${attachments.length})`;
    }

    return `${getAppText("journalpost.skjul-veglegg.knapp.tekst")} (${attachments.length})`;
  }

  return (
    <div className={styles.expandable}>
      <button
        className={styles.expandableTittel}
        onClick={() => handleExpand(title, amplitudeEventData.sender)}
      >
        <ChevronDownIcon
          className={classNames({
            [styles.expanded]: expanded,
          })}
          fontSize="1.5rem"
          aria-hidden
        />
        {getAttechmentsButtonText()}
      </button>
      <div
        className={expanded ? styles.showAttachments : styles.hideAttachments}
        aria-hidden={!expanded}
      >
        {expanded &&
          attachments.map((dokument) => (
            <Attachment
              key={dokument.id}
              title={dokument.tittel}
              links={dokument.links}
              userHaveAccess={dokument.brukerHarTilgang}
              amplitudeEventData={amplitudeEventData}
            />
          ))}
      </div>
    </div>
  );
}
