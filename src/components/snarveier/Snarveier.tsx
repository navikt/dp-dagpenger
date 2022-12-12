import { Heading } from "@navikt/ds-react";
import React from "react";
import { logg } from "../../lib/amplitude";
import { ChevronLenke } from "../chevron-lenke/ChevronLenke";
import { Section } from "../section/Section";
import styles from "./Snarveier.module.css";

interface Snarvei {
  tekst: string;
  url: string;
}

function loggSnarveier(snarvei) {
  logg.klikketSnarvei({ snarvei });
}

const lenker: Snarvei[] = [
  { tekst: "Send klage", url: "https://klage.nav.no/nb/arbeid/dagpenger" },
  {
    tekst: "Forskudd på dagpenger: saldo og tilbakebetaling",
    url: "https://www.nav.no/dagpenger/forskudd/oversikt",
  },
  {
    tekst: "Spørsmål om saken din? Skriv til oss her",
    url: "https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss",
  },
  {
    tekst: "Ny søknad om dagpenger",
    url: "https://www.nav.no/dagpenger/dialog/soknad",
  },
];

export const Snarveier = (): JSX.Element => {
  return (
    <Section>
      <Heading level="2" size="medium">
        Snarveier
      </Heading>
      <ul className={styles.snarveier}>
        {lenker.map((lenke, index) => {
          return (
            <li key={index}>
              <ChevronLenke
                url={lenke.url}
                tekst={lenke.tekst}
                clickCallback={loggSnarveier}
              />
            </li>
          );
        })}
      </ul>
    </Section>
  );
};
