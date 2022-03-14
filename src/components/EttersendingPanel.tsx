import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import "nav-frontend-ekspanderbartpanel-style/dist/main.css";
import "nav-frontend-lenkepanel-style/dist/main.css";
import React from "react";
import { ChevronLenke } from "./ChevronLenke";
import useSWR from "swr";
import api from "../lib/api";
import NavFrontendSpinner from "nav-frontend-spinner";
import "nav-frontend-spinner-style/dist/main.css";
import { Ettersending } from "../pages/api/ettersendelser";
import Panel from "nav-frontend-paneler";
import { AlertStripeFeil } from "nav-frontend-alertstriper";

const ETTERSENDING_FOR_SOKNADSID_URL =
  "https://tjenester.nav.no/soknaddagpenger-innsending/startettersending/";

const ettersendingURL = (søknadId: string) => {
  return ETTERSENDING_FOR_SOKNADSID_URL + søknadId;
};
const commonStyle = {
  paddingLeft: "2rem",
  paddingRight: "2rem",
  marginTop: "2rem",
};

const formatertDato = (datoString: string) =>
  new Date(datoString).toLocaleString("no-NO", {
    dateStyle: "short",
  });

const mapTilLenke = (e: Ettersending, i) => {
  const tittel = `${e.tittel} - Sendt ${formatertDato(e.datoInnsendt)}`;
  return (
    <li key={i} style={{ marginBottom: "24px" }}>
      <ChevronLenke tekst={tittel} url={ettersendingURL(e.søknadId)} />
    </li>
  );
};

const LasterEttersendelser = ({ isLoading }) => (
  <Panel style={commonStyle}>
    Send inn dokument
    {isLoading && <NavFrontendSpinner type={"XXS"} role={"progressbar"} />}
  </Panel>
);

function useEttersendelser() {
  const { data, error } = useSWR<Ettersending[]>(api("ettersendelser"));

  return {
    ettersendelser: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export const EttersendingPanel: React.FC = () => {
  const { ettersendelser, isLoading, isError } = useEttersendelser();

  if (isLoading) return <LasterEttersendelser isLoading={isLoading} />;

  if (isError)
    return (
      <AlertStripeFeil>
        Noe gikk galt. Vi klarte ikke å hente tidligere søknader. Vennligst
        forsøk igjen hvis du prøver å ettersende
      </AlertStripeFeil>
    );

  if (!ettersendelser.length) return null;

  return (
    <Ekspanderbartpanel
      style={commonStyle}
      className="ettersendingPanel"
      tittel="Send inn dokument"
      border={false}
    >
      <div className="panelInnhold">
        Søknader du kan ettersende vedlegg til:
        <ul style={{ listStyle: "none", paddingLeft: "0" }}>
          {ettersendelser.map(mapTilLenke)}
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
