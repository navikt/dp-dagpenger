import React from "react";
import { Alert, BodyLong, Button, Heading } from "@navikt/ds-react";
import Link from "next/link";

export const TilbakemeldingsBoks = () => {
  const triggerHotJar = () =>
    (window as any).hj("trigger", "trigger-generelltilbakemelding");

  return (
    <div className="tilbakemelding-wrapper">
      <Alert variant="info">
        <Heading level="2" size="xsmall" spacing>
          Har du tilbakemeldinger til denne siden?
        </Heading>

        <BodyLong spacing>
          Vi trenger dine innspill på om noe mangler, er feil eller er vanskelig
          å forstå. Vi setter pris på om du tar deg tid til å gi oss innspill
          hvis du har noen. Tilbakemeldingen er anonym og vi kan dessverre ikke
          svare deg, hvis du har spørsmål om saken din kan du{" "}
          <Link href="https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss">
            skrive til oss her.
          </Link>
        </BodyLong>

        <Button variant="secondary" onClick={triggerHotJar}>
          Gi oss tilbakemelding
        </Button>
      </Alert>
      <style jsx>
        {`
          .tilbakemelding-wrapper {
            margin: 2rem 0;
          }
        `}
      </style>
    </div>
  );
};
