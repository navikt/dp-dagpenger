import Script from "next/script";
import { Section } from "./section/Section";
import { SectionContent } from "./section/SectionContent";

export function UxSignalsWidget() {
  if (process.env.UXSIGNALS_ENABLED !== "true") return null;

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
          data-uxsignals-mode={process.env.UXSIGNALS_MODE === "demo" ? "demo" : ""}
          style={{ maxWidth: 620 }}
        />
      </SectionContent>
    </Section>
  );
}
