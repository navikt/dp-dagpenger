import { Notes } from "@navikt/ds-icons";
import { Flatknapp, Knapp } from "nav-frontend-knapper";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import styles from "./PaabegynteSoknader.module.css";

export const PaabegynteSoknader = (props: PaabegyntSoknad): JSX.Element => {
  const { tittel, sistEndret: dato, endreLenke } = props;

  function fortsettPaaSoknaden() {
    window.location.href = endreLenke;
  }

  function slettSoknaden() {
    // TODO: FIKS ALL THE THINGS
  }

  return (
    <li className={styles.paabegynteSoknader}>
      <div className={styles.paabegyntSoknadDetaljer}>
        <Notes className={styles.paabegyntIkon} />
        <div>
          <Undertittel>{tittel}</Undertittel>
          <Undertekst style={{ color: "#6A6A6A" }}>
            Sist endret: {dato}
          </Undertekst>
        </div>
        <Undertekst className={styles.paabegyntStatus}>
          Påbegynt (ikke sendt inn)
        </Undertekst>
      </div>
      <nav className="navigation-container">
        <Knapp onClick={fortsettPaaSoknaden}>Fortsett på søknaden</Knapp>
        <Flatknapp onClick={slettSoknaden}>Slett søknaden</Flatknapp>
      </nav>
    </li>
  );
};
