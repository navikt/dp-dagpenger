import { Heading } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useSanity } from "../../context/sanity-context";
import { useDocumentList } from "../../hooks/useDocumentList";
import { ArbeidssokerStatus } from "../arbeidssoker-status/ArbeidssokerStatus";
import { Section } from "../section/Section";
import { SectionContent } from "../section/SectionContent";

interface IProps {
  hasSoknader: boolean;
}

export function PageHero({ hasSoknader }: IProps) {
  const { getRichText, getAppText } = useSanity();

  const seksjonSoknadText = getRichText("soknader");
  return (
    <Section>
      <SectionContent>
        <header className="page-header">
          <Heading size="xlarge">{getAppText("sidetittel")}</Heading>
        </header>
        {hasSoknader && <PortableText value={seksjonSoknadText} />}
        <ArbeidssokerStatus />
      </SectionContent>
    </Section>
  );
}
