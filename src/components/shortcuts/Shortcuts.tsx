import { Next } from "@navikt/ds-icons";
import { Heading, Link } from "@navikt/ds-react";
import { useSanity } from "../../context/sanity-context";
import { logg } from "../../lib/amplitude";
import { Section } from "../section/Section";
import styles from "./Shortcuts.module.css";
import { ISanityLink } from "../../types/sanity.types";
import { SectionContent } from "../section/SectionContent";

export function Shortcuts() {
  const { getAppText, getLink } = useSanity();

  const shortcuts: ISanityLink[] = [
    getLink("snarveier.send-klage"),
    getLink("snarveier.skriv-til-oss"),
    getLink("snarveier.saldo-og-tilbakebetaling"),
    getLink("snarveier.ny-soknad-om-dagpenger"),
  ];

  return (
    <Section>
      <SectionContent fullWidth>
        <Heading level="2" size="large">
          {getAppText("snarveier.seksjonstittel")}
        </Heading>
        <ul className={styles.shortcuts}>
          {shortcuts.map(({ linkId, linkText, linkUrl }) => {
            return (
              <li key={linkId} className={styles.shortcut}>
                <Link
                  href={linkUrl}
                  onClick={() => logg.klikketSnarvei({ snarvei: linkText })}
                >
                  {linkText}
                </Link>
                <span>Lorem ipsum</span>
              </li>
            );
          })}
        </ul>
      </SectionContent>
    </Section>
  );
}
