import { Alert, Button, Detail, Heading, Tag } from "@navikt/ds-react";
import Link from "next/link";
import { useSanity } from "../../context/sanity-context";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import { FormattedDate } from "../FormattedDate";
import styles from "./Soknader.module.css";

export function PaabegynteSoknader(props: PaabegyntSoknad) {
  const { tittel, sistEndret: dato, endreLenke } = props;
  const { getAppText } = useSanity();

  return (
    <li className={styles.container}>
      <div className={styles.content}>
        <Heading level="3" size="small">
          {tittel} {getAppText("paabegynt-soknad.paabegynt-status")}
        </Heading>
        <Detail spacing>
          {getAppText("paabegynt-soknad.sist-endret.label-tekst")}
          <FormattedDate date={dato} />
        </Detail>
        <Tag variant="neutral" size="small">
          {getAppText("paabegynt-soknad.soknad-er-ikke-sendt-inn")}
        </Tag>
      </div>

      <nav className={styles.linksContainer}>
        <Link href={endreLenke} passHref>
          <Button as="a" variant="secondary" size="small">
            {getAppText("paabegynt-soknad.fortsett-paa-soknaden")}
          </Button>
        </Link>
      </nav>
    </li>
  );
}
