import { Next } from "@navikt/ds-icons";
import { Heading, Link } from "@navikt/ds-react";
import { useSanity } from "../../context/sanity-context";
import { logg } from "../../lib/amplitude";
import { Section } from "../section/Section";
import styles from "./Shortcuts.module.css";
import { ISanityLink } from "../../types/sanity.types";

export function Shortcuts() {
  const { getAppText, getLink } = useSanity();

  const shortcuts: ISanityLink[] = [
    getLink("snarveier.send-klage"),
    getLink("snarveier.saldo-og-tilbakebetaling"),
    getLink("snarveier.skriv-til-oss"),
    getLink("snarveier.ny-soknad-om-dagpenger"),
  ];

  return (
    <Section>
      <Heading level="2" size="medium">
        {getAppText("snarveier.seksjonstittel")}
      </Heading>
      <ul className={styles.shortcuts}>
        {shortcuts.map(({ linkId, linkText, linkUrl }) => {
          return (
            <li key={linkId}>
              <Link
                href={linkUrl}
                className={styles.shortcut}
                onClick={() => logg.klikketSnarvei({ snarvei: linkText })}
              >
                <Next />
                {linkText}
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
