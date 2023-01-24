import { Alert, Button, Heading } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useSanity } from "../../context/sanity-context";
import styles from "./FeedbackBox.module.css";

export function FeedbackBox() {
  const { getAppText, getRichText } = useSanity();

  function triggerHotJar() {
    (window as any).hj("trigger", "trigger-generelltilbakemelding");
  }

  return (
    <div className={styles.feedbackBoxContainer}>
      <Alert variant="info">
        <Heading level="2" size="xsmall" spacing>
          {getAppText("tekst.gi-oss-tilbakemelding.seksjonstittel")}
        </Heading>
        <PortableText
          value={getRichText("rik-tekst.gi-oss-tilbakemelding.detaljer")}
        />
        <Button variant="secondary" onClick={triggerHotJar}>
          {getAppText("tekst.gi-oss-tilbakemelding.knapp-tekst")}
        </Button>
      </Alert>
    </div>
  );
}
