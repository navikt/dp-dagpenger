import { FileContent } from "@navikt/ds-icons";
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
      <FileContent className={styles.soknadIkon} />
      <div className={styles.soknadInnhold}>
        <Heading level="3" size="small">
          {tittel}
        </Heading>

        <Detail spacing>
          {getAppText("tekst.fullfort-soknad.sendt-dato.label-tekst")}{" "}
          <FormattedDate date={datoInnsendt} />
        </Detail>

        <nav className="navigation-container">
          {erNySøknadsdialog && (
            <>
              <Link href={ettersendingUrl} passHref>
                <Button as="a" variant="secondary">
                  {getAppText(
                    "tekst.fullfort-soknad.send-dokumentasjon.knapp-tekst"
                  )}
                </Button>
              </Link>
              <Link href={endreLenke} passHref>
                <Button as="a" variant="tertiary">
                  {getAppText("tekst.fullfort-soknad.se-soknad.knapp-tekst")}
                </Button>
              </Link>
            </>
          )}

          {!erNySøknadsdialog && (
            <Link href={endreLenke} passHref>
              <Button as="a" variant="secondary">
                {getAppText(
                  "tekst.fullfort-soknad.send-dokumentasjon.knapp-tekst"
                )}
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </li>
  );
}
