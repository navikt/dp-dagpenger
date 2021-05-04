import { Next } from "@navikt/ds-icons";
import React from "react";
import Lenke from "nav-frontend-lenker";
import { Systemtittel } from "nav-frontend-typografi";

interface Snarvei {
  tekst: string;
  url: string;
}

export const Snarveier = () => {
  const lenker: Snarvei[] = [
    {
      tekst: "Les mer om dagpenger på nav.no",
      url: "https://www.nav.no/arbeid/arbeidsledig",
    },
    { tekst: "Send klage", url: "https://klage.nav.no/nb/arbeid/dagpenger" },
    {
      tekst: "Last opp vedlegg",
      url: "https://tjenester.nav.no/saksoversikt/ettersending",
    },
    {
      tekst: "Meld fra om endringer",
      url:
        "https://www.nav.no/no/nav-og-samfunn/om-nav/relatert-informasjon/du-har-plikt-til-a-gi-nav-riktige-opplysninger",
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

  return (
    <div className="snarveier-wrapper">
      <div className="tittel-container">
        <Systemtittel style={{ marginBottom: "10px" }}>Snarveier</Systemtittel>
        <ul>
          {lenker.map((lenke, index) => {
            return (
              <li key={index}>
                <Lenke
                  href={lenke.url}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Next />
                  <span>{lenke.tekst}</span>
                </Lenke>
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx>{`
        .snarveier-wrapper {
          display: block;
          margin-top: 50px;
          margin-bottom: 105px;
          background-color: white;
          border-radius: 0.5rem;
          padding: 2rem;
        }
        .tittel-container {
          margin-bottom: 1em;
        }
        ul {
          list-style-type: none;
          padding-left: 0;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          max-height: 150px;
        }
        li {
          padding-bottom: 20px;
        }
      `}</style>
    </div>
  );
};
