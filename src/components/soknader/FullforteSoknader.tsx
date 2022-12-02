import { Undertekst, Undertittel } from "nav-frontend-typografi";
import Link from "next/link";
import { Søknad } from "../../pages/api/soknader";
import { FormattertDato } from "../formattertDato/FormattertDato";
import { FileContent } from "@navikt/ds-icons";
import getConfig from "next/config";
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
        <Undertittel>{tittel}</Undertittel>
        <Undertekst className={styles.soknadDato}>
          Sendt: <FormattertDato dato={dato} />
        </Undertekst>
        <nav className="navigation-container">
          {erNySøknadsdialog && (
            <>
              <Link href={ettersendingUrl} passHref>
                <a className="knapp knapp--standard">Send dokumentasjon</a>
              </Link>
              <Link href={endreLenke} passHref>
                <a className="knapp knapp--standard">Se søknaden</a>
              </Link>
            </>
          )}

          {!erNySøknadsdialog && (
            <Link href={endreLenke} passHref>
              <a className="knapp knapp--standard">Send dokumentasjon</a>
            </Link>
          )}
        </nav>
      </div>
    </li>
  );
};
