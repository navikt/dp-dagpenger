import { BodyShort, Button, Heading } from "@navikt/ds-react";
import getConfig from "next/config";
import Link from "next/link";
import { useSanity } from "../../context/sanity-context";
import { Søknad } from "../../pages/api/soknader";
import { FormattedDate } from "../FormattedDate";
import styles from "./Soknader.module.css";

const { publicRuntimeConfig } = getConfig();

export function FullforteSoknader(props: Søknad) {
  const { søknadId, tittel, datoInnsendt, endreLenke, erNySøknadsdialog } = props;
  const { getAppText } = useSanity();

  const ettersendingUrl = `${publicRuntimeConfig.NEXT_PUBLIC_SOKNADSDIALOG}/soknad/${søknadId}/ettersending`;
  const generellInnsendingUrl = `${publicRuntimeConfig.NEXT_PUBLIC_SOKNADSDIALOG}/generell-innsending`;

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
