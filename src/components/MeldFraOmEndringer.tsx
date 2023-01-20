import { Button, Heading } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { useSanity } from "../context/sanity-context";
import { Section } from "./section/Section";

export const MeldFraOmEndringer = () => {
  const { getAppText, getRichText } = useSanity();
  return (
    <Section>
      <Heading level="2" size="medium" spacing>
        {getAppText("Meld fra om endring")}
      </Heading>
      <PortableText
        value={getRichText("rik-tekst.meld-fra-om-endring.informasjon")}
      />
      <nav className="navigation-container">
        <Link
          href={getAppText("tekst.meld-fra-om-endring.melding-om-endring.url")}
          passHref
        >
          <Button variant="secondary" as="a">
            {getAppText(
              "tekst.meld-fra-om-endring.melding-om-endring.knapp-tekst"
            )}
          </Button>
        </Link>
        <Link
          href={getAppText("tekst.meld-fra-om-endring.send-inn-dokument.url")}
          passHref
        >
          <Button variant="tertiary" as="a">
            {getAppText(
              "tekst.meld-fra-om-endring.send-inn-dokument.knapp-tekst"
            )}
          </Button>
        </Link>
      </nav>
    </Section>
  );
};
