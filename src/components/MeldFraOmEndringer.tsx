import { BodyLong, Button, Heading } from "@navikt/ds-react";
import Link from "next/link";
import { Section } from "./section/Section";

export const MeldFraOmEndringer = () => {
  return (
    <Section>
      <Heading level="2" size="medium" spacing>
        Meld fra om endring
      </Heading>
      <BodyLong>
        Det er viktig at du gir oss beskjed hvis situasjonen din endrer seg, for
        eksempel hvis du er tilbake i jobb, er syk eller oppholder deg i
        utlandet. Se{" "}
        <a href="https://www.nav.no/arbeid/dagpenger#gi-beskjed-hvis-situasjonen-din-endrer-seg">
          hvilke endringer du må gi beskjed om
        </a>
        .
      </BodyLong>
      <nav className="navigation-container">
        <Link
          href="https://innboks.nav.no/s/skriv-til-oss?category=Arbeid"
          passHref
        >
          <Button variant="secondary" as="a">
            Send melding om endring
          </Button>
        </Link>
        <Link
          href="https://www.nav.no/dagpenger/dialog/generell-innsending"
          passHref
        >
          <Button variant="tertiary" as="a">
            Send inn dokument
          </Button>
        </Link>
      </nav>
    </Section>
  );
};
