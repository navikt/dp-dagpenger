import { Notes } from "@navikt/ds-icons";
import { Flatknapp, Knapp } from "nav-frontend-knapper";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import { Søknad } from "../../pages/api/soknader";
import { innenfor12Uker } from "../../util/soknadDato.util";
import { FormattertDato } from "../formattertDato/FormattertDato";
import styles from "./FullforteSoknader.module.css";

export const FullforteSoknader = (props: Søknad): JSX.Element => {
  const { tittel, datoInnsendt: dato } = props;

  const skalKunneEttersende: boolean = innenfor12Uker(dato);

  function sendDokumentasjon() {
    // TODO: denne fikser vi sammen :)
    // hvis 12 uker, kunne ettersende
    // etter 12 uker, stoppe ettersende, sende oss noe, bare en knapp
  }

  function seSoknaden() {
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
        <Knapp onClick={sendDokumentasjon}>Send dokumentasjon</Knapp>
        {skalKunneEttersende && (
          <Flatknapp onClick={seSoknaden}>Se søknaden</Flatknapp>
        )}
      </nav>
    </li>
  );
};
