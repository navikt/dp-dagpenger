import React from "react";
import { Accordion, BodyLong, Button } from "@navikt/ds-react";
import { Section } from "./section/Section";
import { useSanity } from "../context/sanity-context";
import { PortableText } from "@portabletext/react";

export function InfoOmGammelSoknad() {
  const { getAppText, getRichText, getLink } = useSanity();

  const infoOmGammelSoknadLink = getLink(
    "info-om-gammel-soknad.send-inn-dokumentasjon"
  );

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
            <Button as="a" href={infoOmGammelSoknadLink.linkUrl}>
              {infoOmGammelSoknadLink.linkText}
            </Button>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Section>
  );
}
