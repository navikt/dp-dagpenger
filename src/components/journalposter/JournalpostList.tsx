import { useState } from "react";
import { Alert, BodyLong, Button, Heading, Loader } from "@navikt/ds-react";
import { useSanity } from "../../context/sanity-context";
import { useDocumentList } from "../../hooks/useDocumentList";
import { useTrackingShownDocumentList } from "../../hooks/useTrackingShownDocumentList";
import { logg } from "../../lib/amplitude";
import { Section } from "../section/Section";
import styles from "./Jounalposter.module.css";
import { JournalpostCard } from "./JournalpostCard";
import { SectionContent } from "../section/SectionContent";

const NUMBER_OF_DOCUMENTS_TO_SHOW_BY_DEFAULT = 10;

export function JournalpostList() {
  const [showAll, setShowAll] = useState(false);
  const { getAppText } = useSanity();
  const { journalposter, isLoading, isError } = useDocumentList();

  useTrackingShownDocumentList(journalposter);

  if (isLoading) {
    return (
      <Section>
        <SectionContent>
          <Loader size="2xlarge" title={getAppText("journalpost.laster-innhold")} />
        </SectionContent>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section>
        <SectionContent>
          <Alert variant="error">{getAppText("journalpost.feil-ved-henting-av-dokumenter")}</Alert>
        </SectionContent>
      </Section>
    );
  }

  if (journalposter.length === 0) {
    return <></>;
  }

  function handleShowAll() {
    setShowAll(!showAll);
    logg.klikketVisAlleDokumenter({ antallDokumenter: journalposter.length });
  }

  const journalposterToShow = journalposter.slice(
    0,
    showAll ? journalposter.length : NUMBER_OF_DOCUMENTS_TO_SHOW_BY_DEFAULT,
  );

  return (
    <Section>
      <SectionContent>
        <Heading level="2" size="large" spacing>
          {getAppText("journalpost.seksjonstittel")}
        </Heading>
        <BodyLong spacing>{getAppText("journalpost.seksjonssbeskrivelse")}</BodyLong>
      </SectionContent>
      <SectionContent fullWidth>
        {journalposterToShow.map((journalpost) => (
          <JournalpostCard key={journalpost.journalpostId} {...journalpost} />
        ))}
        {!showAll && journalposter.length > NUMBER_OF_DOCUMENTS_TO_SHOW_BY_DEFAULT && (
          <div className={styles.showAllDocumentButtonContainer}>
            <Button variant="secondary" onClick={handleShowAll}>
              {getAppText("journalpost.vis-alle-dokumenter")} ({journalposter.length})
            </Button>
          </div>
        )}
      </SectionContent>
    </Section>
  );
}
