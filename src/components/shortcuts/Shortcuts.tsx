import { Next } from "@navikt/ds-icons";
import { Heading, Link } from "@navikt/ds-react";
import { useSanity } from "../../context/sanity-context";
import { logg } from "../../lib/amplitude";
import { Section } from "../section/Section";
import styles from "./Shortcuts.module.css";

interface IShortcut {
  text: string;
  url: string;
}

export function Shortcuts() {
  const { getAppText } = useSanity();

  const shortcuts: IShortcut[] = [
    {
      text: getAppText("snarveier.send-klage.lenke-tekst"),
      url: getAppText("snarveier.send-klage.lenke-url"),
    },
    {
      text: getAppText("snarveier.saldo-og-tilbakebetaling.lenke-tekst"),
      url: getAppText("snarveier.saldo-og-tilbakebetaling.url"),
    },
    {
      text: getAppText("snarveier.skriv-til-oss.lenke-tekst"),
      url: getAppText("snarveier.skriv-til-oss.url"),
    },
    {
      text: getAppText("snarveier.ny-soknad-om-dagpenger.lenke-tekst"),
      url: getAppText("snarveier.ny-soknad-om-dagpenger.url"),
    },
  ];

  function logShortcuts(shorcut) {
    logg.klikketSnarvei({ snarvei: shorcut });
  }

  return (
    <Section>
      <Heading level="2" size="medium">
        {getAppText("tekst.snarveier.seksjonstittel")}
      </Heading>
      <ul className={styles.shortcuts}>
        {shortcuts.map((link, index) => {
          return (
            <li key={index}>
              <Link
                href={link.url}
                className={styles.shortcut}
                onClick={() => logShortcuts(link.text)}
              >
                <Next />
                {link.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
