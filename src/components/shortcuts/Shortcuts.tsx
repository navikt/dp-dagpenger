import { Heading } from "@navikt/ds-react";
import React from "react";
import { logg } from "../../lib/amplitude";
import { Section } from "../section/Section";
import styles from "./Shortcuts.module.css";
import { useSanity } from "../../context/sanity-context";
import { Next } from "@navikt/ds-icons";
import Link from "next/link";

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

  function logShortcuts(snarvei) {
    logg.klikketSnarvei({ snarvei });
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
                passHref
                onClick={() => logShortcuts(-link.text)}
              >
                <a className={styles.shortcut}>
                  <Next />
                  <span>{link.text}</span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
