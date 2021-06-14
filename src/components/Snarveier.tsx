import { Next } from "@navikt/ds-icons";
import React from "react";
import Lenke from "nav-frontend-lenker";
import { logg } from "../utilities/amplitude";

interface Snarvei {
  tekst: string;
  url: string;
}

export const Snarveier = (): JSX.Element => {
  const lenker: Snarvei[] = [
    {
      tekst: "Les mer om dagpenger",
      url: "https://www.nav.no/arbeid",
    },
    { tekst: "Send klage", url: "https://klage.nav.no/nb/arbeid/dagpenger" },
    {
      tekst: "Last opp vedlegg",
      url: "https://tjenester.nav.no/saksoversikt/ettersending",
    },
    {
      tekst: "Meld fra om endringer",
      url: "https://www.nav.no/no/nav-og-samfunn/om-nav/relatert-informasjon/du-har-plikt-til-a-gi-nav-riktige-opplysninger",
    },
    {
      tekst: "Spørsmål om saken din? Skriv til oss her",
      url: "https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss",
    },
    {
      tekst: "Endre kontonummer for utbetaling",
      url: "https://www.nav.no/person/personopplysninger/nb/#utbetaling",
    },
  ];

  const loggSnarveier = (snarvei) => () => {
    logg.klikketSnarvei({ snarvei });
  };

  return (
    <>
      <ul>
        {lenker.map((lenke, index) => {
          return (
            <li key={index}>
              <Lenke
                href={lenke.url}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
                onClick={loggSnarveier(lenke.tekst)}
              >
                <div style={{ height: "24px", width: "24px", flexShrink: 0 }}>
                  <Next />
                </div>
                <span>{lenke.tekst}</span>
              </Lenke>
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        ul {
          list-style-type: none;
          margin-top: 50px;
          margin-bottom: 10px;
          padding-left: 0;
          display: flex;
          flex-flow: row wrap;
        }
        li {
          display: flex;
          margin-bottom: 20px;
          margin-right: 1rem;
          width: 12rem;
          flex-grow: 1;
        }
      `}</style>
    </>
  );
};
