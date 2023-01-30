import { Alert, Heading } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useSanity } from "../../context/sanity-context";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import { Søknad } from "../../pages/api/soknader";
import { innenfor12Uker } from "../../util/soknadDato.util";
import { Section } from "../section/Section";
import { FullforteSoknader } from "./FullforteSoknader";
import { PaabegynteSoknader } from "./PaabegynteSoknader";
import styles from "./Soknader.module.css";

interface IProps {
  paabegynteSoknader?: PaabegyntSoknad[] | null;
  fullforteSoknader: Søknad[] | null;
}

export function Soknader({ paabegynteSoknader, fullforteSoknader }: IProps) {
  const { getRichText, getAppText } = useSanity();

  const seksjonSoknadText = getRichText("soknader");

  if (paabegynteSoknader?.length === 0 && fullforteSoknader?.length === 0) {
    return <></>;
  }

  return (
    <Section highlighted>
      <Heading size="large">Mine søknader</Heading>
      {paabegynteSoknader === null && (
        <Alert variant="error" className={styles.feilmelding}>
          {getAppText("feil-melding.klarte-ikke-hente-paabegynt-soknader")}
        </Alert>
      )}
      {fullforteSoknader === null && (
        <Alert variant="error" className={styles.feilmelding}>
          {getAppText("feil-melding.klarte-ikke-hente-fullforte-soknader")}
        </Alert>
      )}
      {paabegynteSoknader && (
        <ul className={styles.soknader}>
          {paabegynteSoknader.map((soknad) => (
            <PaabegynteSoknader key={soknad.søknadId} {...soknad} />
          ))}
        </ul>
      )}
      {fullforteSoknader && (
        <ul className={styles.soknader}>
          {fullforteSoknader.map((soknad) => {
            if (innenfor12Uker(soknad.datoInnsendt)) {
              return <FullforteSoknader key={soknad.søknadId} {...soknad} />;
            }
          })}
        </ul>
      )}
    </Section>
  );
}
