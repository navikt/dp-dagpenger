import { Alert, Button, Heading } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useSanity } from "../../context/sanity-context";
import styles from "./FeedbackBox.module.css";
import { Section } from "../section/Section";
import { SectionContent } from "../section/SectionContent";

export function FeedbackBox() {
  const { getAppText, getRichText } = useSanity();

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  function triggerHotJar() {
    (window as any).hj("trigger", "trigger-generelltilbakemelding");
  }

  return (
    <Section>
      <SectionContent>
        <div className={styles.feedbackBoxContainer}>
          <Alert variant="info">
            <Heading level="2" size="xsmall" spacing>
              {getAppText("gi-oss-tilbakemelding.seksjonstittel")}
            </Heading>
            <PortableText
              value={getRichText("gi-oss-tilbakemelding.detaljer")}
            />
            <Button variant="secondary" onClick={triggerHotJar}>
              {getAppText("gi-oss-tilbakemelding.knapp-tekst")}
            </Button>
          </Alert>
        </div>
      </SectionContent>
    </Section>
  );
}
