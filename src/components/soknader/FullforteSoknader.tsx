import { BodyShort, Button, Heading } from "@navikt/ds-react";
import Link from "next/link";
import { useSanity } from "../../context/sanity-context";
import { Søknad } from "../../pages/api/soknader";
import { FormattedDate } from "../FormattedDate";
import styles from "./Soknader.module.css";

interface IProps {
  soknad: Søknad;
  soknadsdialogIngress: string;
}

export function FullforteSoknader({ soknad, soknadsdialogIngress }: IProps) {
  const { søknadId, tittel, datoInnsendt, endreLenke, erNySøknadsdialog } = soknad;
  const { getAppText } = useSanity();

  const ettersendingUrl = `${soknadsdialogIngress}/soknad/${søknadId}/ettersending`;
  const generellInnsendingUrl = `${soknadsdialogIngress}/generell-innsending`;

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
