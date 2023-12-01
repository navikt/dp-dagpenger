import { BodyShort, Button, Heading, Tag } from "@navikt/ds-react";
import Link from "next/link";
import { useSanity } from "../../context/sanity-context";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import { FormattedDate } from "../FormattedDate";
import styles from "./Soknader.module.css";

export function PaabegynteSoknader(props: PaabegyntSoknad) {
  const { tittel, sistEndret: dato, endreLenke, søknadId } = props;
  const { getAppText } = useSanity();

  return (
    <li className={styles.soknadContainer}>
      <article className={styles.soknadContent} aria-labelledby={`tittel-${søknadId}`}>
        <Heading level="3" size="small" id={`tittel-${søknadId}`}>
          {tittel} {getAppText("paabegynt-soknad.paabegynt-status")}
        </Heading>
        <BodyShort className={styles.soknadDate} size="small">
          {getAppText("paabegynt-soknad.sist-endret.label-tekst")}
          <FormattedDate date={dato} />
        </BodyShort>
        <Tag variant="neutral" size="small" className={styles.soknadTag}>
          {getAppText("paabegynt-soknad.soknad-er-ikke-sendt-inn")}
        </Tag>
        <nav className={styles.soknadLinksContainer}>
          <Link href={endreLenke} passHref>
            <Button as="a" variant="secondary" size="small">
              {getAppText("paabegynt-soknad.fortsett-paa-soknaden")}
            </Button>
          </Link>
        </nav>
      </article>
    </li>
  );
}
