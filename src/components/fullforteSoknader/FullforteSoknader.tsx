import { Undertekst, Undertittel } from "nav-frontend-typografi";
import Link from "next/link";
import { Søknad } from "../../pages/api/soknader";
import { FormattertDato } from "../formattertDato/FormattertDato";
import styles from "./FullforteSoknader.module.css";
import { FileProgress } from "@navikt/ds-icons";

export const FullforteSoknader = (props: Søknad): JSX.Element => {
  const { tittel, datoInnsendt: dato, endreLenke } = props;

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
        <Link href={endreLenke} passHref>
          <a className="knapp knapp--standard">Send dokumentasjon</a>
        </Link>
        {/*
          husk Se svaret på søknaden i Ferdig behandlet
        <Knapp onClick={sendDokumentasjon}>Send dokumentasjon</Knapp>

        */}
      </nav>
    </li>
  );
};
