import Script from "next/script";
import { Section } from "./section/Section";
import { SectionContent } from "./section/SectionContent";

interface IProps {
  enabled: boolean;
  mode: string;
}

export function UxSignalsWidget({ enabled, mode }: IProps) {
  if (!enabled) return null;

  return (
    <Section>
      <SectionContent>
        <Script
          type="module"
          strategy="lazyOnload"
          src="https://uxsignals-frontend.uxsignals.app.iterate.no/embed.js"
        />
        <div
          data-uxsignals-embed="panel-2pm41rubk2"
          data-uxsignals-mode={mode}
          style={{ maxWidth: 630 }}
        />
      </SectionContent>
    </Section>
  );
}
