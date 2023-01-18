import { Alert, BodyLong, Heading } from "@navikt/ds-react";
import { useSanity } from "../../context/sanity-context";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import { PortableText } from "@portabletext/react";
import { Søknad } from "../../pages/api/soknader";
import { innenfor12Uker } from "../../util/soknadDato.util";
import { Ikon } from "../Ikon";
import { Kontonummer } from "../kontonummer/Kontonummer";
import { Registreringsstatus } from "../Registreringsstatus";
import { Section, SectionContent } from "../section/Section";
import { FullforteSoknader } from "./FullforteSoknader";
import { PaabegynteSoknader } from "./PaabegynteSoknader";
import styles from "./Soknader.module.css";

interface Props {
  paabegynteSoknader?: PaabegyntSoknad[] | null;
  fullforteSoknader: Søknad[] | null;
}

export const Soknader = ({
  paabegynteSoknader,
  fullforteSoknader,
}: Props): JSX.Element => {
  const { getInfoText } = useSanity();

  const seksjonSoknadText = getInfoText("innsyn.info-tekst.soknader");

  if (paabegynteSoknader?.length === 0 && fullforteSoknader?.length === 0) {
    return <></>;
  }

  return (
    <Section iconSvg={<Ikon navn="place" />} fullWith={true}>
      <SectionContent>
        <PortableText value={seksjonSoknadText?.body} />
        <Kontonummer />
        <Registreringsstatus />
        {paabegynteSoknader === null && (
          <Alert variant="error" className={styles.feilmelding}>
            Vi klarte dessverre ikke å hente ut påbegynte søknader. Prøv igjen
            senere.
          </Alert>
        )}
        {fullforteSoknader === null && (
          <Alert variant="error" className={styles.feilmelding}>
            Vi klarte dessverre ikke å hente ut fullførte søknader. Prøv igjen
            senere.
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
};
