import { Alert } from "@navikt/ds-react";
import { useSanity } from "../../context/sanity-context";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import { PortableText } from "@portabletext/react";
import { Søknad } from "../../pages/api/soknader";
import { innenfor12Uker } from "../../util/soknadDato.util";
import { Ikon } from "../Ikon";
import { ArbeidssokerStatus } from "../arbeidssoker-status/ArbeidssokerStatus";
import { Section, SectionContent } from "../section/Section";
import { FullforteSoknader } from "./FullforteSoknader";
import { PaabegynteSoknader } from "./PaabegynteSoknader";
import styles from "./Soknader.module.css";
import { AccountNumber } from "../account-number/AccountNumber";

interface IProps {
  paabegynteSoknader?: PaabegyntSoknad[] | null;
  fullforteSoknader: Søknad[] | null;
}

export function Soknader({ paabegynteSoknader, fullforteSoknader }: IProps) {
  const { getRichText, getAppText } = useSanity();

  const seksjonSoknadText = getRichText("rik-tekst.soknader");

  if (paabegynteSoknader?.length === 0 && fullforteSoknader?.length === 0) {
    return <></>;
  }

  return (
    <Section iconSvg={<Ikon navn="place" />} fullWith={true}>
      <SectionContent>
        <PortableText value={seksjonSoknadText} />
        <AccountNumber />
        <ArbeidssokerStatus />
        {paabegynteSoknader === null && (
          <Alert variant="error" className={styles.feilmelding}>
            {getAppText(
              "tekst.feil-melding.klarte-ikke-hente-paabegynt-soknader"
            )}
          </Alert>
        )}
        {fullforteSoknader === null && (
          <Alert variant="error" className={styles.feilmelding}>
            {getAppText(
              "tekst.feil-melding.klarte-ikke-hente-fullforte-soknader"
            )}
          </Alert>
        )}
      </SectionContent>
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
