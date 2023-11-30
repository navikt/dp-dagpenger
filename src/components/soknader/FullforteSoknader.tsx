import { BodyShort, Button, Heading } from "@navikt/ds-react";
import getConfig from "next/config";
import Link from "next/link";
import { useSanity } from "../../context/sanity-context";
import { Søknad } from "../../pages/api/soknader";
import { FormattedDate } from "../FormattedDate";
import { formattedDateTime } from "../../util/date.utils";
import styles from "./Soknader.module.css";

const { publicRuntimeConfig } = getConfig();

export function FullforteSoknader(props: Søknad) {
  const { søknadId, tittel, datoInnsendt, endreLenke, erNySøknadsdialog } =
    props;
  const { getAppText } = useSanity();

  const ettersendingUrl = `${publicRuntimeConfig.NEXT_PUBLIC_SOKNADSDIALOG}/soknad/${søknadId}/ettersending`;
  const generellInnsendingUrl = `${publicRuntimeConfig.NEXT_PUBLIC_SOKNADSDIALOG}/generell-innsending`;

  // Sannsynligvis skjer dette kun på papirsøknader
  const fallbackGenerellInnsending = !søknadId && !endreLenke;

  const fullfortSoknadtSendtDatoLabelTekst = getAppText(
    "fullfort-soknad.sendt-dato.label-tekst",
  );
  const skjermleserTekst = `${tittel} ${fullfortSoknadtSendtDatoLabelTekst} ${formattedDateTime(
    datoInnsendt,
  )}`;

  return (
    <li className={styles.soknadContainer}>
      <div className={styles.soknadContent}>
        <Heading level="3" size="small" aria-label={skjermleserTekst}>
          {tittel}
        </Heading>
        <BodyShort className={styles.soknadDate} size="small" aria-hidden>
          {getAppText("fullfort-soknad.sendt-dato.label-tekst")}{" "}
          <FormattedDate date={datoInnsendt} />
        </BodyShort>
      </div>
      <nav className={styles.soknadLinksContainer}>
        {erNySøknadsdialog && (
          <>
            <Link href={ettersendingUrl} passHref>
              <Button as="a" variant="primary" size="small">
                {getAppText("fullfort-soknad.send-dokumentasjon.knapp-tekst")}
              </Button>
            </Link>
            <Link href={endreLenke} passHref>
              <Button as="a" variant="secondary" size="small">
                {getAppText("fullfort-soknad.se-soknad.knapp-tekst")}
              </Button>
            </Link>
          </>
        )}
        {!erNySøknadsdialog && !fallbackGenerellInnsending && (
          <Link href={endreLenke} passHref>
            <Button as="a" variant="primary" size="small">
              {getAppText("fullfort-soknad.send-dokumentasjon.knapp-tekst")}
            </Button>
          </Link>
        )}
        {fallbackGenerellInnsending && (
          <Link href={generellInnsendingUrl} passHref>
            <Button as="a" variant="primary" size="small">
              {getAppText("fullfort-soknad.send-dokumentasjon.knapp-tekst")}
            </Button>
          </Link>
        )}
      </nav>
    </li>
  );
}
