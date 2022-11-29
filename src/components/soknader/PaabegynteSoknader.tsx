import { Notes } from "@navikt/ds-icons";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import Link from "next/link";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import { FormattertDato } from "../formattertDato/FormattertDato";
import styles from "./Soknader.module.css";

export const PaabegynteSoknader = (props: PaabegyntSoknad): JSX.Element => {
  const { tittel, sistEndret: dato, endreLenke } = props;

  return (
    <li className={styles.soknad}>
      <Notes className={styles.soknadIkon} />
      <div className={styles.soknadInnhold}>
        <div className={styles.soknadTittel}>
          <div>
            <Undertittel>{tittel}</Undertittel>
            <Undertekst className={styles.soknadDato}>
              Sist endret: <FormattertDato dato={dato} />
            </Undertekst>
          </div>
        </div>
        <nav className="navigation-container">
          <Link href={endreLenke} passHref>
            <a className="knapp knapp--standard">Fortsett på søknaden</a>
          </Link>
        </nav>
      </div>
    </li>
  );
};
