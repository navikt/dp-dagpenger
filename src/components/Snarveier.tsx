import React from "react";
import { logg } from "../lib/amplitude";
import { ChevronLenke } from "./ChevronLenke";
import styles from "./Snarveier.module.css";

interface Props {
  erNySoknadAapen: boolean;
}

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
    url: "https://www.nav.no/dagpenger/soknad",
  },
];

const gamleLenker: Snarvei[] = [
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
    url: "https://www.nav.no/arbeid/dagpenger/soknad-veileder",
  },
];

export const Snarveier = ({ erNySoknadAapen }: Props): JSX.Element => {
  if (erNySoknadAapen) {
    return (
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
    );
  }

  return (
    <ul className={styles.snarveier}>
      {gamleLenker.map((lenke, index) => {
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
  );
};
