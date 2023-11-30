import { BodyShort, Button, Heading, Tag } from "@navikt/ds-react";
import Link from "next/link";
import { useSanity } from "../../context/sanity-context";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import { FormattedDate } from "../FormattedDate";
import { formattedDateTime } from "../../util/date.utils";
import styles from "./Soknader.module.css";

export function PaabegynteSoknader(props: PaabegyntSoknad) {
  const { tittel, sistEndret: dato, endreLenke } = props;
  const { getAppText } = useSanity();

  const fullfortSoknadtSendtDatoLabelTekst = getAppText(
    "fullfort-soknad.sendt-dato.label-tekst",
  );
  const skjermleserTekst = `${tittel} ${fullfortSoknadtSendtDatoLabelTekst} ${formattedDateTime(
    dato,
  )}`;

  return (
    <li className={styles.soknadContainer}>
      <div className={styles.soknadContent}>
        <Heading level="3" size="small" aria-label={skjermleserTekst}>
          {tittel} {getAppText("paabegynt-soknad.paabegynt-status")}
        </Heading>
        <BodyShort className={styles.soknadDate} size="small" aria-hidden>
          {getAppText("paabegynt-soknad.sist-endret.label-tekst")}
          <FormattedDate date={dato} />
        </BodyShort>
        <Tag variant="neutral" size="small" className={styles.soknadTag}>
          {getAppText("paabegynt-soknad.soknad-er-ikke-sendt-inn")}
        </Tag>
      </div>

      <nav className={styles.soknadLinksContainer}>
        <Link href={endreLenke} passHref>
          <Button as="a" variant="secondary" size="small">
            {getAppText("paabegynt-soknad.fortsett-paa-soknaden")}
          </Button>
        </Link>
      </nav>
    </li>
  );
}
