import { Notes } from "@navikt/ds-icons";
import { Alert, Button, Detail, Heading } from "@navikt/ds-react";
import Link from "next/link";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import { FormattedDate } from "../FormattedDate";
import styles from "./Soknader.module.css";
import { useSanity } from "../../context/sanity-context";

export function PaabegynteSoknader(props: PaabegyntSoknad) {
  const { tittel, sistEndret: dato, endreLenke } = props;
  const { getAppText } = useSanity();

  return (
    <li className={styles.soknad}>
      <Notes className={styles.soknadIkon} />
      <div className={styles.soknadInnhold}>
        <div className={styles.soknadTittel}>
          <div>
            <Heading level="3" size="small">
              {tittel} {getAppText("paabegynt-soknad.paabegynt-status")}
            </Heading>
            <Detail spacing>
              {getAppText("paabegynt-soknad.sist-endret.label-tekst")}{" "}
              <FormattedDate date={dato} />
            </Detail>
            <Alert variant="info" inline size="small">
              {getAppText("paabegynt-soknad.soknad-er-ikke-sendt-inn")}
            </Alert>
          </div>
        </div>

        <nav className="navigation-container">
          <Link href={endreLenke} passHref>
            <Button as="a" variant="secondary">
              {getAppText("paabegynt-soknad.fortsett-paa-soknaden")}
            </Button>
          </Link>
        </nav>
      </div>
    </li>
  );
}
