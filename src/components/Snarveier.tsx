import React from "react";
import { logg } from "../lib/amplitude";
import { ChevronLenke } from "./ChevronLenke";

interface Snarvei {
  tekst: string;
  url: string;
}

function loggSnarveier(snarvei) {
  logg.klikketSnarvei({ snarvei });
}

export const Snarveier = (): JSX.Element => {
  const lenker: Snarvei[] = [
    {
      tekst: "Les mer om dagpenger",
      url: "https://www.nav.no/arbeid",
    },
    { tekst: "Send klage", url: "https://klage.nav.no/nb/arbeid/dagpenger" },
    {
      tekst: "Meld fra om endringer",
      url: "https://www.nav.no/no/nav-og-samfunn/om-nav/relatert-informasjon/du-har-plikt-til-a-gi-nav-riktige-opplysninger",
    },
    {
      tekst: "Spørsmål om saken din? Skriv til oss her",
      url: "https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss",
    },
    {
      tekst: "Forskudd på dagpenger: saldo og tilbakebetaling",
      url: "https://www.nav.no/dagpenger/forskudd/oversikt",
    },
    {
      tekst: "Ny søknad om dagpenger",
      url: "https://www.nav.no/arbeid/dagpenger/soknad-veileder",
    },
  ];

  return (
    <>
      <ul>
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

      <style jsx>{`
        ul {
          list-style-type: none;
          margin-top: 30px;
          margin-bottom: 0px;
          padding-left: 0;
          display: flex;
          flex-flow: row wrap;
        }
        li {
          display: flex;
          margin-bottom: 20px;
          margin-right: 1rem;
          width: 12rem;
          overflow-wrap: break-word;
        }
      `}</style>
    </>
  );
};
