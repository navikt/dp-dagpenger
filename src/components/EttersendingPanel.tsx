import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import "nav-frontend-ekspanderbartpanel-style/dist/main.css";
import { Normaltekst } from "nav-frontend-typografi";
import React from "react";
import { ChevronLenke } from "./Snarveier";

interface EttersendingPanelProps {
  soknader: any[];
}

const formatertDato = (datoString: string) =>
  new Date(datoString).toLocaleString("no-NO", {
    dateStyle: "short",
  });

export const EttersendingPanel = (props: EttersendingPanelProps) => {
  const { soknader } = props;
  const infoTekst = () => {
    if (!soknader.length) return null;

    const subjekt = soknader.length === 1 ? "søknad" : "søknader";

    return `Du har ${soknader.length} ${subjekt} som du kan ettersende vedlegg til:`;
  };

  const mapTilLenke = (s, i) => {
    const tittel = `${s.tittel} - Sendt ${formatertDato(s.datoInnsendt)}`;
    return (
      <li key={i} style={{ marginBottom: "24px" }}>
        <ChevronLenke tekst={tittel} url="http://vg.no" />
        <Normaltekst style={{ marginLeft: "24px" }}>
          Du har sagt at du skal ettersende X vedlegg - X av X er sendt inn
        </Normaltekst>
      </li>
    );
  };

  return (
    <Ekspanderbartpanel
      style={{ padding: "2rem", marginTop: "2rem" }}
      className="ettersendingPanel"
      tittel="Send inn vedlegg / dokumenter"
      border={false}
    >
      <div className="panelInnhold">
        {infoTekst()}
        <ul style={{ listStyle: "none", paddingLeft: "0" }}>
          {soknader.map(mapTilLenke)}
        </ul>
        <style jsx>{`
          .panelInnhold {
            padding: 0 1rem 0 1rem;
          }
        `}</style>
      </div>
    </Ekspanderbartpanel>
  );
};
