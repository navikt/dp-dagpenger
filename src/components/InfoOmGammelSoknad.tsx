import { Accordion, BodyLong, Button } from "@navikt/ds-react";
import { Section } from "./section/Section";

export const InfoOmGammelSoknad = () => {
  return (
    <Section>
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>
            Skal du se eller ettersende til en søknad som ikke vises her?
          </Accordion.Header>
          <Accordion.Content>
            <BodyLong spacing>
              Vi har oppdatert systemene våre, og noen av søknadene vil derfor
              ikke vises her. Se hvor lang{" "}
              <a href="https://www.nav.no/saksbehandlingstider#dagpenger">
                saksbehandlingstiden
              </a>{" "}
              for dagpenger er nå.
            </BodyLong>
            <BodyLong spacing>
              I dokumentlisten under finner du søknaden du sendte inn, med
              informasjon om hvilken dokumentasjon du skulle ettersende. Hvis du
              har spørsmål kan du{" "}
              <a href="https://www.nav.no/kontaktoss">ta kontakt</a>.
            </BodyLong>
            <Button
              as="a"
              href="https://www.nav.no/dagpenger/dialog/generell-innsending"
            >
              Send inn dokumentasjon
            </Button>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Section>
  );
};
