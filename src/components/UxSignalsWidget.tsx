import Script from "next/script";
import { Section } from "./section/Section";
import { SectionContent } from "./section/SectionContent";
import getConfig from "next/config";

export function UxSignalsWidget() {
  const { publicRuntimeConfig } = getConfig();
  const enabled = publicRuntimeConfig.NEXT_PUBLIC_UXSIGNALS_ENABLED === "enabled";

  console.log(
    "publicRuntimeConfig.NEXT_PUBLIC_UXSIGNALS_ENABLED: ",
    publicRuntimeConfig.NEXT_PUBLIC_UXSIGNALS_ENABLED,
  );
  console.log(
    "publicRuntimeConfig.NEXT_PUBLIC_UXSIGNALS_MODE: ",
    publicRuntimeConfig.NEXT_PUBLIC_UXSIGNALS_MODE,
  );

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
          data-uxsignals-mode={
            publicRuntimeConfig.NEXT_PUBLIC_UXSIGNALS_MODE === "demo" ? "demo" : ""
          }
          style={{ maxWidth: 630 }}
        />
      </SectionContent>
    </Section>
  );
}
