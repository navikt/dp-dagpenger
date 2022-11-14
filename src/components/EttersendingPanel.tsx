import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import "nav-frontend-ekspanderbartpanel-style/dist/main.css";
import "nav-frontend-lenkepanel-style/dist/main.css";
import React from "react";
import { ChevronLenke } from "./ChevronLenke";
import useSWR from "swr";
import api from "../lib/api";
import NavFrontendSpinner from "nav-frontend-spinner";
import "nav-frontend-spinner-style/dist/main.css";
import {
  Ettersending,
  EttersendingResultat,
} from "../pages/api/ettersendelser";
import Panel from "nav-frontend-paneler";
import {
  AlertStripeAdvarsel,
  AlertStripeFeil,
} from "nav-frontend-alertstriper";
import { Normaltekst } from "nav-frontend-typografi";
import { validate as isValidUUID } from "uuid";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const ETTERSENDING_FOR_SOKNADSID_URL =
  "https://tjenester.nav.no/soknaddagpenger-innsending/startettersending/";

const nyEttersendingURL = (søknadId: string) => {
  return (
    publicRuntimeConfig.NEXT_PUBLIC_SOKNADSDIALOG + søknadId + "/ettersending"
  );
};

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

const soknadsdialogUrl = (e: Ettersending) => {
  if (isValidUUID(e.søknadId)) {
    return nyEttersendingURL(e.søknadId);
  } else {
    return ettersendingURL(e.søknadId);
  }
};

const mapTilLenke = (e: Ettersending, i) => {
  const tittel = `${e.tittel} - Sendt ${formatertDato(e.datoInnsendt)}`;
  return (
    <li key={i} style={{ marginBottom: "24px" }}>
      <ChevronLenke tekst={tittel} url={soknadsdialogUrl(e)} />
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
  const { data, error } = useSWR<EttersendingResultat>(api("ettersendelser"));

  return {
    ettersendelser: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export const EttersendingPanel: React.FC = () => {
  const { ettersendelser, isLoading, isError } = useEttersendelser();

  if (isLoading) return <LasterEttersendelser isLoading={isLoading} />;

  return (
    <Ekspanderbartpanel
      style={commonStyle}
      className="ettersendingPanel"
      tittel="Send inn dokument"
      border={false}
    >
      <div className="panelInnhold">
        {!isError && (
          <>
            {ettersendelser.results.length == 0 && (
              <>
                <Normaltekst>
                  Du har ingen søknader som du kan ettersende vedlegg til.
                </Normaltekst>
              </>
            )}
            {ettersendelser.results.length > 0 && (
              <>
                Søknader du kan ettersende vedlegg til:
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  {ettersendelser.results.map(mapTilLenke)}
                </ul>
              </>
            )}
            {ettersendelser.failedSources.length > 0 && (
              <AlertStripeAdvarsel>
                Vi har en midlertidig feil som gjør at vi ikke klarer å hente
                alle søknader. Du kan prøve igjen senere hvis du ikke finner
                søknaden her.
              </AlertStripeAdvarsel>
            )}
          </>
        )}
        {isError && (
          <AlertStripeFeil>
            Vi har en midlertidig feil som gjør at vi ikke klarer å hente dine
            søknader. Du kan prøve igjen senere.
          </AlertStripeFeil>
        )}

        <style jsx>{`
          .panelInnhold {
            padding: 0 1rem 0 1rem;
          }
        `}</style>
      </div>
    </Ekspanderbartpanel>
  );
};
