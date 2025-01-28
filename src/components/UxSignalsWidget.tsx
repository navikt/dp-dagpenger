import { Section } from "./section/Section";
import { SectionContent } from "./section/SectionContent";
import { useSanity } from "../context/sanity-context";
import { useEffect } from "react";
import { logger } from "@navikt/next-logger";

interface IProps {
  enabled: boolean;
  mode: string;
}

export function UxSignalsWidget({ enabled, mode }: IProps) {
  const { getSetting } = useSanity();
  const uxSignalId = getSetting("uxsignals");

  useEffect(() => {
    if (enabled) {
      const script = document.createElement("script");
      script.src = "https://widget.uxsignals.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        try {
          document.body.removeChild(script);
        } catch {
          logger.error("Kunne vise uxsignals widget!");
        }
      };
    }
  }, [enabled]);

  if (!enabled || !uxSignalId) return null;

  return (
    <Section>
      <SectionContent>
        <div
          data-uxsignals-embed={uxSignalId}
          data-uxsignals-mode={mode}
          style={{ maxWidth: 630 }}
        />
      </SectionContent>
    </Section>
  );
}
