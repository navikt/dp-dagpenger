import { useState } from "react";
import { Alert, BodyLong, Button, Heading, Loader } from "@navikt/ds-react";
import { useSanity } from "../../context/sanity-context";
import { useDocumentList } from "../../hooks/useDocumentList";
import { useTrackingShownDocumentList } from "../../hooks/useTrackingShownDocumentList";
import { logg } from "../../lib/amplitude";
import { Icon } from "../Icon";
import { Section } from "../section/Section";
import { SectionContent } from "../section/SectionContent";
import { NUMBER_OF_DOCUMENTS_TO_SHOW_BY_DEFAULT } from "../../constants";
import styles from "./Jounalposter.module.css";
import { JournalpostCard } from "./JournalpostCard";

export function JournalpostList() {
  const [showAll, setShowAll] = useState(false);
  const { getAppText } = useSanity();
  const { journalposter, isLoading, isError } = useDocumentList();

  useTrackingShownDocumentList(journalposter);

  if (isLoading) {
    return (
      <Section>
        <Loader
          size="2xlarge"
          title={getAppText("journalpost.laster-innhold")}
          data-testid="get-documents-loader"
        />
      </Section>
    );
  }

  if (isError) {
    return (
      <Section>
        <Alert variant="error" data-testid="get-documents-error">
          {getAppText("journalpost.feil-ved-henting-av-dokumenter")}
        </Alert>
      </Section>
    );
  }

  function handleShowAll() {
    setShowAll(!showAll);
    logg.klikketVisAlleDokumenter({ antallDokumenter: journalposter.length });
  }

  const journalposterToShow = journalposter.slice(
    0,
    showAll ? journalposter.length : NUMBER_OF_DOCUMENTS_TO_SHOW_BY_DEFAULT
  );

  return (
    <Section iconSvg={<Icon name="copy" />} fullWith>
      <SectionContent>
        <Heading level="2" size="medium">
          {getAppText("journalpost.seksjonsstittel")}
        </Heading>
        <BodyLong>{getAppText("journalpost.seksjonssbeskrivelse")}</BodyLong>
      </SectionContent>

      {journalposterToShow.map((journalpost) => (
        <JournalpostCard key={journalpost.journalpostId} {...journalpost} />
      ))}

      {!showAll &&
        journalposter.length > NUMBER_OF_DOCUMENTS_TO_SHOW_BY_DEFAULT && (
          <div className={styles.showAllDocumentButtonContainer}>
            <Button variant="secondary" onClick={handleShowAll}>
              {getAppText("journalpost.vis-alle-dokumenter")} (
              {journalposter.length})
            </Button>
          </div>
        )}
    </Section>
  );
}
