import { Notes } from "@navikt/ds-icons";
import { Alert, Button, Detail, Heading } from "@navikt/ds-react";
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
            <Heading level="3" size="small">
              {tittel} (Påbegynt)
            </Heading>
            <Detail spacing>
              Sist endret: <FormattertDato dato={dato} />
            </Detail>
            <Alert variant="info" inline size="small">
              Denne søknaden er ikke sendt inn.
            </Alert>
          </div>
        </div>

        <nav className="navigation-container">
          <Link href={endreLenke} passHref>
            <Button as="a" variant="secondary">
              Fortsett på søknaden
            </Button>
          </Link>
        </nav>
      </div>
    </li>
  );
};
