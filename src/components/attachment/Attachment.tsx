import { BodyShort } from "@navikt/ds-react";
import { useSanity } from "../../context/sanity-context";
import { DokumentHendelse } from "../../lib/amplitude";
import { Link } from "../../pages/api/dokumenter";
import { DocumentActionButtons } from "../document-action-buttons/DocumentActionButtons";
import { HiddenDocument } from "../hidden-document/HiddenDocument";
import styles from "./Attachment.module.css";

interface IProps {
  title: string;
  links: Link[];
  userHaveAccess: boolean;
  amplitudeEventData: DokumentHendelse;
}

export function Attachment({ title, links, userHaveAccess, amplitudeEventData }: IProps) {
  const preview = links.find((link) => link.rel == "preview");
  const { getAppText } = useSanity();

  return (
    <div className={styles.attachment}>
      <BodyShort className={styles.attachmentTitle}>
        {title || getAppText("journalpost.dokument-uten-tittel")}
      </BodyShort>
      {!userHaveAccess && <HiddenDocument amplitudeEventData={amplitudeEventData} />}
      {userHaveAccess && (
        <DocumentActionButtons
          title={title}
          preview={preview}
          amplitudeEventData={amplitudeEventData}
        />
      )}
    </div>
  );
}
