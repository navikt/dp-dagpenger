import { Notes } from "@navikt/ds-icons";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import Link from "next/link";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import { FormattertDato } from "../formattertDato/FormattertDato";
import styles from "./PaabegynteSoknader.module.css";

export const PaabegynteSoknader = (props: PaabegyntSoknad): JSX.Element => {
  const { tittel, sistEndret: dato, endreLenke } = props;

  return (
    <li className={styles.paabegyntSoknad}>
      <div className={styles.paabegyntSoknadDetaljer}>
        <Notes className={styles.paabegyntIkon} />
        <div>
          <Undertittel>{tittel}</Undertittel>
          <Undertekst style={{ color: "#6A6A6A" }}>
            Sist endret: <FormattertDato dato={dato} />
          </Undertekst>
        </div>
      </div>
      <nav className="navigation-container">
        <Link href={endreLenke} passHref>
          <a className="knapp knapp--standard">Fortsett på søknaden</a>
        </Link>
      </nav>
    </li>
  );
};
