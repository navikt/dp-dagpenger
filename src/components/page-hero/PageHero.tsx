import { Heading } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useSanity } from "../../context/sanity-context";
import { ArbeidssokerStatus } from "../arbeidssoker-status/ArbeidssokerStatus";
import { Section } from "../section/Section";
import { SectionContent } from "../section/SectionContent";

export function PageHero() {
  const { getRichText, getAppText } = useSanity();

  const seksjonSoknadText = getRichText("soknader");
  return (
    <Section>
      <SectionContent>
        <header className="page-header">
          <Heading size="xlarge">{getAppText("sidetittel")}</Heading>
        </header>
        <PortableText value={seksjonSoknadText} />
        <ArbeidssokerStatus />
      </SectionContent>
    </Section>
  );
}
