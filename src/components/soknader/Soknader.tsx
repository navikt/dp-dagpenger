import { Alert, Heading } from "@navikt/ds-react";
import { useSanity } from "../../context/sanity-context";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import { Søknad } from "../../pages/api/soknader";
import { innenfor12Uker } from "../../util/soknadDato.util";
import { Section } from "../section/Section";
import { SectionContent } from "../section/SectionContent";
import { FullforteSoknader } from "./FullforteSoknader";
import { PaabegynteSoknader } from "./PaabegynteSoknader";
import styles from "./Soknader.module.css";

interface IProps {
  paabegynteSoknader?: PaabegyntSoknad[] | null;
  fullforteSoknader: Søknad[] | null;
  soknadsdialogIngress: string;
}

export function Soknader({ paabegynteSoknader, fullforteSoknader, soknadsdialogIngress }: IProps) {
  const { getAppText } = useSanity();

  const fullforteSoknaderInnenfor12Uker = fullforteSoknader?.filter((soknad) =>
    innenfor12Uker(soknad.datoInnsendt),
  );

  if (!paabegynteSoknader?.length && !fullforteSoknaderInnenfor12Uker?.length) {
    return <></>;
  }

  return (
    <Section highlighted>
      <SectionContent>
        <Heading level="2" size="large" spacing>
          {getAppText("seksjon.mine-soknader.seksjonsbeskrivelse")}
        </Heading>
        {paabegynteSoknader === null && (
          <Alert variant="error" className={styles.errorContainer}>
            {getAppText("feil-melding.klarte-ikke-hente-paabegynt-soknader")}
          </Alert>
        )}
        {fullforteSoknader === null && (
          <Alert variant="error" className={styles.errorContainer}>
            {getAppText("feil-melding.klarte-ikke-hente-fullforte-soknader")}
          </Alert>
        )}
        {!!paabegynteSoknader?.length && (
          <ul className={styles.soknader}>
            {paabegynteSoknader.map((soknad) => (
              <PaabegynteSoknader key={soknad.søknadId} {...soknad} />
            ))}
          </ul>
        )}
        {!!fullforteSoknaderInnenfor12Uker.length && (
          <ul className={styles.soknader}>
            {fullforteSoknaderInnenfor12Uker.map((soknad) => (
              <FullforteSoknader
                key={soknad.søknadId}
                soknad={soknad}
                soknadsdialogIngress={soknadsdialogIngress}
              />
            ))}
          </ul>
        )}
      </SectionContent>
    </Section>
  );
}
