import React from "react";
import { Accordion, BodyLong, Button } from "@navikt/ds-react";
import { Section } from "./section/Section";
import { useSanity } from "../context/sanity-context";
import { PortableText } from "@portabletext/react";

export function InfoOmGammelSoknad() {
  const { getAppText, getRichText } = useSanity();
  return (
    <Section>
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>
            {getAppText("info-om-gammel-soknad.tittel")}
          </Accordion.Header>
          <Accordion.Content>
            <PortableText
              value={getRichText("info-om-gammel-soknad.info-tekst")}
            />
            <Button
              as="a"
              href={getAppText(
                "info-om-gammel-soknad.send-inn-dokumentasjon.url"
              )}
            >
              {getAppText(
                "info-om-gammel-soknad.send-inn-dokumentasjon.knapp-tekst"
              )}
            </Button>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Section>
  );
}
