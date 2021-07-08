import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Lenkepanel from "nav-frontend-lenkepanel";
import "nav-frontend-ekspanderbartpanel-style/dist/main.css";
import "nav-frontend-lenkepanel-style/dist/main.css";
import React from "react";
import { ChevronLenke } from "./ChevronLenke";
import { Søknad } from "../pages/api/soknader";
import useSWR from "swr";
import api from "../lib/api";
import NavFrontendSpinner from "nav-frontend-spinner";
import "nav-frontend-spinner-style/dist/main.css";

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

const mapTilLenke = (s: Søknad, i) => {
  const tittel = `${s.tittel} - Sendt ${formatertDato(s.datoInnsendt)}`;
  return (
    <li key={i} style={{ marginBottom: "24px" }}>
      <ChevronLenke tekst={tittel} url={ettersendingURL(s.søknadId)} />
    </li>
  );
};

const TidligereSoknader = () => (
  <ChevronLenke tekst="Tidligere søknader" url={ETTERSENDING_URL} />
);

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

function useSøknader() {
  const { data, error } = useSWR<Søknad[]>(api("soknader"));

  return {
    søknader: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export const EttersendingPanel: React.FC = () => {
  const { søknader, isLoading } = useSøknader();

  if (!søknader) return <IngenSoknader isLoading={isLoading} />;

  const erDigitalSøknad = (s: Søknad) => s.kanal === "Digital";
  const digitaleSøknader = søknader.filter(erDigitalSøknad);

  if (!digitaleSøknader.length) return <IngenSoknader isLoading={false} />;

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
          {digitaleSøknader.map(mapTilLenke)}
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
