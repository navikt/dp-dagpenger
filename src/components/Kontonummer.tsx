import useSWR from "swr";
import React from "react";
import api from "../utilities/api";
import { Personalia } from "../pages/api/personalia";

export const Kontonummer = () => {
  const { data: personalia, error } = useSWR<Personalia>(api("personalia"));

  if (!personalia || !personalia.kontonummer || error) return null;

  const { kontonummer } = personalia;
  const formattertKontonummer = splittTekstIBolker(kontonummer, [4, 2, 6]);

  return (
    <div style={{ marginTop: "1rem" }}>
      Ditt kontonummer er {formattertKontonummer}
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
