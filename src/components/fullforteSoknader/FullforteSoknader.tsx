import { Notes } from "@navikt/ds-icons";
import { Flatknapp, Knapp } from "nav-frontend-knapper";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import { Søknad } from "../../pages/api/soknader";
import styles from "./FullforteSoknader.module.css";

export const FullforteSoknader = (props: Søknad): JSX.Element => {
  const { tittel, datoInnsendt: dato } = props;

  function trykkVenstreKnapp() {
    // TODO: denne fikser vi sammen :)
  }

  function trykkHoyreKnapp() {
    // TODO: denne fikser vi sammen :)
  }

  return (
    <li className={styles.fullforteSoknader}>
      <div className={styles.fullforteSoknaderDetaljer}>
        <Notes className={styles.fullfortIkon} />

        <div>
          <Undertittel>{tittel}</Undertittel>
          <Undertekst style={{ color: "#6A6A6A" }}>Sendt: {dato}</Undertekst>
        </div>
        <Undertekst className={styles.fullfortStatus}>
          Fullført søknad
        </Undertekst>
      </div>
      <nav className="navigation-container">
        <Knapp onClick={trykkVenstreKnapp}>En tekst her</Knapp>
        <Flatknapp onClick={trykkHoyreKnapp}>En annen tekst her</Flatknapp>
      </nav>
    </li>
  );
};
