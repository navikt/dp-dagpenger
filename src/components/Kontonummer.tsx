import useSWR from "swr";
import React from "react";
import api from "../lib/api";
import { Personalia } from "../pages/api/personalia";
import Lenke from "nav-frontend-lenker";

export const Kontonummer = () => {
  const { data: personalia, error } = useSWR<Personalia>(api("personalia"));

  const getFormattertKontonummer = () => {
    if (!personalia || !personalia.kontonummer || error) return null;
    const { kontonummer } = personalia;
    if (kontonummer.length > 11)
      return splittTekstIBolker(kontonummer, [kontonummer.length]);
    else return splittTekstIBolker(kontonummer, [4, 2, 5]);
  };

  const renderKontonummer = () => {
    return (
      <>
        Du har registrert dette kontonummeret hos NAV:{" "}
        {getFormattertKontonummer()}. <EndreKontonummerButton />
      </>
    );
  };

  const EndreKontonummerButton = ({
    tekst = "Endre kontonummer",
  }: {
    tekst?: string;
  }): JSX.Element => {
    return (
      <Lenke
        href={"https://www.nav.no/person/personopplysninger/nb/#utbetaling"}
      >
        {tekst}
      </Lenke>
    );
  };

  const renderManglendeKontonummer = () => (
    <>
      Husk å <EndreKontonummerButton tekst="kontrollere kontonummeret" /> som er
      registrert hos NAV.
    </>
  );

  return (
    <div style={{ marginTop: "1rem" }}>
      {getFormattertKontonummer()
        ? renderKontonummer()
        : renderManglendeKontonummer()}
    </div>
  );
};

const splittTekstIBolker = (tekst: string, bolker: number[]) =>
  bolker
    .map((lengde, i, offsets) => {
      const start = offsets.slice(0, i).reduce((acc, cv) => acc + cv, 0);
      return tekst.substr(start, lengde);
    })
    .join(" ");
