import { Button, Detail, Heading } from "@navikt/ds-react";
import getConfig from "next/config";
import Link from "next/link";
import { useSanity } from "../../context/sanity-context";
import { Søknad } from "../../pages/api/soknader";
import { FormattedDate } from "../FormattedDate";
import styles from "./Soknader.module.css";

const { publicRuntimeConfig } = getConfig();

export function FullforteSoknader(props: Søknad) {
  const { søknadId, tittel, datoInnsendt, endreLenke, erNySøknadsdialog } =
    props;
  const { getAppText } = useSanity();

  const ettersendingUrl =
    publicRuntimeConfig.NEXT_PUBLIC_SOKNADSDIALOG + søknadId + "/ettersending";

  return (
    <li className={styles.soknad}>
      <div className={styles.soknadInnhold}>
        <div className={styles.soknadTittel}>
          <Heading level="3" size="small">
            {tittel}
          </Heading>

          <Detail spacing>
            {getAppText("fullfort-soknad.sendt-dato.label-tekst")}{" "}
            <FormattedDate date={datoInnsendt} />
          </Detail>
        </div>
      </div>
      <nav className={styles.soknadLenke}>
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

        {!erNySøknadsdialog && (
          <Link href={endreLenke} passHref>
            <Button as="a" variant="primary" size="small">
              {getAppText("fullfort-soknad.send-dokumentasjon.knapp-tekst")}
            </Button>
          </Link>
        )}
      </nav>
    </li>
  );
}
