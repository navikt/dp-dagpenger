import { BodyShort, Button, Heading } from "@navikt/ds-react";
import Link from "next/link";
import { useSanity } from "../../context/sanity-context";
import { Søknad } from "../../pages/api/soknader";
import { FormattedDate } from "../FormattedDate";
import styles from "./Soknader.module.css";

interface IFullforteSoknader extends Søknad {
  soknadsdialogUrl: string;
}

export function FullforteSoknader(props: IFullforteSoknader) {
  const { søknadId, tittel, datoInnsendt, endreLenke, erNySøknadsdialog, soknadsdialogUrl } = props;
  const { getAppText } = useSanity();

  const ettersendingUrl = `${soknadsdialogUrl}/soknad/${søknadId}/ettersending`;
  const generellInnsendingUrl = `${soknadsdialogUrl}/generell-innsending`;

  // Sannsynligvis skjer dette kun på papirsøknader
  const fallbackGenerellInnsending = !søknadId && !endreLenke;

  return (
    <li className={styles.soknadContainer}>
      <article className={styles.soknadContent} aria-labelledby={`tittel-${søknadId}`}>
        <Heading level="3" size="small" id={`tittel-${søknadId}`}>
          {tittel}
        </Heading>
        <BodyShort className={styles.soknadDate} size="small">
          {getAppText("fullfort-soknad.sendt-dato.label-tekst")}{" "}
          <FormattedDate date={datoInnsendt} />
        </BodyShort>
      </article>
      <nav className={styles.soknadLinksContainer}>
        {erNySøknadsdialog && (
          <>
            <Link href={ettersendingUrl} passHref legacyBehavior>
              <Button as="a" variant="primary" size="small">
                {getAppText("fullfort-soknad.send-dokumentasjon.knapp-tekst")}
              </Button>
            </Link>
            <Link href={endreLenke} passHref legacyBehavior>
              <Button as="a" variant="secondary" size="small">
                {getAppText("fullfort-soknad.se-soknad.knapp-tekst")}
              </Button>
            </Link>
          </>
        )}
        {!erNySøknadsdialog && !fallbackGenerellInnsending && (
          <Link href={endreLenke} passHref legacyBehavior>
            <Button as="a" variant="primary" size="small">
              {getAppText("fullfort-soknad.send-dokumentasjon.knapp-tekst")}
            </Button>
          </Link>
        )}
        {fallbackGenerellInnsending && (
          <Link href={generellInnsendingUrl} passHref legacyBehavior>
            <Button as="a" variant="primary" size="small">
              {getAppText("fullfort-soknad.send-dokumentasjon.knapp-tekst")}
            </Button>
          </Link>
        )}
      </nav>
    </li>
  );
}
