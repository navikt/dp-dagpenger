import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Lenkepanel from "nav-frontend-lenkepanel";
import "nav-frontend-ekspanderbartpanel-style/dist/main.css";
import "nav-frontend-lenkepanel-style/dist/main.css";
import React from "react";
import { ChevronLenke } from "./ChevronLenke";
import useSWR from "swr";
import api from "../lib/api";
import NavFrontendSpinner from "nav-frontend-spinner";
import "nav-frontend-spinner-style/dist/main.css";
import { Ettersending } from "../pages/api/ettersendelser";

const ETTERSENDING_URL = "https://tjenester.nav.no/saksoversikt/ettersending";
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
  const tittel = `${e.tittel} - Sendt ${formatertDato(e.innsendtDato)}`;
  return (
    <li key={i} style={{ marginBottom: "24px" }}>
      <ChevronLenke tekst={tittel} url={ettersendingURL(e.søknadId)} />
    </li>
  );
};

const IngenSoknader = ({ isLoading }) => (
  <Lenkepanel
    style={commonStyle}
    tittelProps="undertittel"
    href={ETTERSENDING_URL}
  >
    Send inn dokument
    {isLoading && <NavFrontendSpinner type={"XXS"} role={"progressbar"} />}
  </Lenkepanel>
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
  const { ettersendelser, isLoading } = useEttersendelser();

  if (!ettersendelser) return <IngenSoknader isLoading={isLoading} />;

  if (!ettersendelser.length) return <IngenSoknader isLoading={false} />;

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
