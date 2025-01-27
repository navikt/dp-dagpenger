import Script from "next/script";
import { Section } from "./section/Section";
import { SectionContent } from "./section/SectionContent";
import { useSanity } from "../context/sanity-context";

interface IProps {
  enabled: boolean;
  mode: string;
}

export function UxSignalsWidget({ enabled, mode }: IProps) {
  const { getSetting } = useSanity();
  const uxSignalId = getSetting("uxsignals");

  if (!enabled || !uxSignalId) return null;

  return (
    <Section>
      <SectionContent>
        <Script type="module" strategy="lazyOnload" src="https://widget.uxsignals.com/" />
        <div
          data-uxsignals-embed={uxSignalId}
          data-uxsignals-mode={mode}
          style={{ maxWidth: 630 }}
        />
      </SectionContent>
    </Section>
  );
}
