import { Heading } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useSanity } from "../../context/sanity-context";
import { ArbeidssokerStatus } from "../arbeidssoker-status/ArbeidssokerStatus";
import { Section } from "../section/Section";
import { SectionContent } from "../section/SectionContent";

interface IProps {
  hasFullforteSoknader: boolean;
}

export function PageHero({ hasFullforteSoknader }: IProps) {
  const { getRichText, getAppText } = useSanity();

  const seksjonSoknadText = getRichText("soknader");
  return (
    <Section>
      <SectionContent>
        <Heading className="page-header" size="xlarge">
          {getAppText("sidetittel")}
        </Heading>
        {hasFullforteSoknader && <PortableText value={seksjonSoknadText} />}
        <ArbeidssokerStatus />
      </SectionContent>
    </Section>
  );
}
