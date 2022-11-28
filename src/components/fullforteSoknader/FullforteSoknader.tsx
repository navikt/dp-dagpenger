import { Undertekst, Undertittel } from "nav-frontend-typografi";
import Link from "next/link";
import { Søknad } from "../../pages/api/soknader";
import { FormattertDato } from "../formattertDato/FormattertDato";
import styles from "./FullforteSoknader.module.css";
import { FileProgress } from "@navikt/ds-icons";
import getConfig from "next/config";

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
    <li className={styles.fullforteSoknader}>
      <div className={styles.fullforteSoknaderDetaljer}>
        <FileProgress className={styles.fullfortIkon} />

        <div>
          <Undertittel>{tittel}</Undertittel>
          <Undertekst style={{ color: "#6A6A6A" }}>
            Sendt: <FormattertDato dato={dato} />
          </Undertekst>
        </div>
      </div>
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
            <a className="knapp knapp--standard">Send inn dokumentasjon</a>
          </Link>
        )}
      </nav>
    </li>
  );
};
