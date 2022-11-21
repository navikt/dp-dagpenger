import { Notes } from "@navikt/ds-icons";
import { Flatknapp, Knapp } from "nav-frontend-knapper";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import Link from "next/link";
import { Søknad } from "../../pages/api/soknader";
import { innenfor12Uker } from "../../util/soknadDato.util";
import { FormattertDato } from "../formattertDato/FormattertDato";
import styles from "./FullforteSoknader.module.css";

export const FullforteSoknader = (props: Søknad): JSX.Element => {
  const { tittel, datoInnsendt: dato, endreLenke } = props;

  const skalKunneEttersende: boolean = innenfor12Uker(dato);

  // TODO: denne fikser vi sammen :)
  // hvis 12 uker, kunne ettersende
  // etter 12 uker, stoppe ettersende, sende oss noe, bare en knapp

  function seSoknaden(): void {
    // TODO: denne fikser vi sammen :)
  }

  return (
    <li className={styles.fullforteSoknader}>
      <div className={styles.fullforteSoknaderDetaljer}>
        <Notes className={styles.fullfortIkon} />

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
        {skalKunneEttersende && (
          <Flatknapp onClick={seSoknaden}>Se søknaden</Flatknapp>
        )}
      </nav>
    </li>
  );
};
