import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Lenkepanel from "nav-frontend-lenkepanel";
import "nav-frontend-ekspanderbartpanel-style/dist/main.css";
import "nav-frontend-lenkepanel-style/dist/main.css";
import React from "react";
import { ChevronLenke } from "./ChevronLenke";
import { Søknad } from "../pages/api/soknader";

const ETTERSENDING_URL = "https://tjenester.nav.no/saksoversikt/ettersending";
const ETTERSENDING_FOR_SOKNADSID_URL =
  "https://tjenester.nav.no/soknaddagpenger-innsending/startettersending/";

const etterSendingURL = (søknadId: string) => {
  return ETTERSENDING_FOR_SOKNADSID_URL + søknadId;
};

interface EttersendingPanelProps {
  soknader: Pick<Søknad, "datoInnsendt" | "tittel" | "søknadId" | "kanal">[];
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

const mapTilLenke = (s: Søknad, i) => {
  const tittel = `${s.tittel} - Sendt ${formatertDato(s.datoInnsendt)}`;
  return (
    <li key={i} style={{ marginBottom: "24px" }}>
      <ChevronLenke tekst={tittel} url={etterSendingURL(s.søknadId)} />
    </li>
  );
};

const TidligereSoknader = () => (
  <ChevronLenke tekst="Tidligere søknader" url={ETTERSENDING_URL} />
);

const IngenSoknader = () => (
  <Lenkepanel
    style={commonStyle}
    tittelProps="undertittel"
    href={ETTERSENDING_URL}
  >
    Send inn dokument
  </Lenkepanel>
);

export const EttersendingPanel = (props: EttersendingPanelProps) => {
  const erDigitalSøknad = (s: Søknad) => s.kanal === "Digital";
  const soknader = props.soknader.filter(erDigitalSøknad);

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
