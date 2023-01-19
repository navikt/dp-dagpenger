import Link from "next/link";
import { Søknad } from "../../pages/api/soknader";
import { FormattedDate } from "../formatted-date/FormattedDate";
import { FileContent } from "@navikt/ds-icons";
import getConfig from "next/config";
import { Button, Detail, Heading } from "@navikt/ds-react";
import styles from "./Soknader.module.css";

const { publicRuntimeConfig } = getConfig();

export const FullforteSoknader = (props: Søknad): JSX.Element => {
  const {
    søknadId,
    tittel,
    datoInnsendt: dato,
    endreLenke,
    erNySøknadsdialog,
  } = props;

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
          Sendt: <FormattedDate date={dato} />
        </Detail>

        <nav className="navigation-container">
          {erNySøknadsdialog && (
            <>
              <Link href={ettersendingUrl} passHref>
                <Button as="a" variant="secondary">
                  Send dokumentasjon
                </Button>
              </Link>
              <Link href={endreLenke} passHref>
                <Button as="a" variant="tertiary">
                  Se søknaden
                </Button>
              </Link>
            </>
          )}

          {!erNySøknadsdialog && (
            <Link href={endreLenke} passHref>
              <Button as="a" variant="secondary">
                Send dokumentasjon
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </li>
  );
};
