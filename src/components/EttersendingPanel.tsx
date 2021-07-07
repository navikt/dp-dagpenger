import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Lenkepanel from "nav-frontend-lenkepanel";
import "nav-frontend-ekspanderbartpanel-style/dist/main.css";
import "nav-frontend-lenkepanel-style/dist/main.css";
import { Normaltekst } from "nav-frontend-typografi";
import React from "react";
import { ChevronLenke } from "./Snarveier";

interface EttersendingPanelProps {
  soknader: any[];
}

const commonStyle = {
  paddingLeft: "2rem",
  paddingRight: "2rem",
  marginTop: "2rem",
};

const formatertDato = (datoString: string) =>
  new Date(datoString).toLocaleString("no-NO", {
    dateStyle: "short",
  });

const mapTilLenke = (s, i) => {
  const tittel = `${s.tittel} - Sendt ${formatertDato(s.datoInnsendt)}`;
  return (
    <li key={i} style={{ marginBottom: "24px" }}>
      <ChevronLenke tekst={tittel} url="http://vg.no" />
      <Normaltekst style={{ marginLeft: "24px" }}>
        X av X er sendt inn
      </Normaltekst>
    </li>
  );
};

const TidligereSoknader = () => (
  <ChevronLenke
    tekst="Tidligere søknader"
    url="https://tjenester.nav.no/saksoversikt/ettersending"
  />
);

const IngenSoknader = () => (
  <Lenkepanel
    style={commonStyle}
    tittelProps="undertittel"
    href="https://tjenester.nav.no/saksoversikt/ettersending"
  >
    Send inn dokument
  </Lenkepanel>
);

export const EttersendingPanel = (props: EttersendingPanelProps) => {
  const { soknader } = props;

  if (!soknader.length) return <IngenSoknader />;

  const infoTekst = () => {
    return `Søknader du kan ettersende vedlegg til:`;
  };

  return (
    <Ekspanderbartpanel
      style={commonStyle}
      className="ettersendingPanel"
      tittel="Send inn dokument"
      border={false}
    >
      <div className="panelInnhold">
        {infoTekst()}
        <ul style={{ listStyle: "none", paddingLeft: "0" }}>
          {soknader.map(mapTilLenke)}
          <li>
            <TidligereSoknader />
          </li>
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
