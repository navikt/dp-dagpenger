import getConfig from "next/config";
import { AmplitudeClient, Config, LogReturn } from "amplitude-js";

let loggInstance: AmplitudeClient;

if (typeof window !== "undefined") {
  const amplitude = require("amplitude-js");

  const getApiKey = () => {
    const { publicRuntimeConfig } = getConfig();
    return process.env.AMPLITUDE_API_KEY || publicRuntimeConfig.amplitudeKey;
  };

  const options: Config = {
    apiEndpoint: "amplitude.nav.no/collect",
    saveEvents: false,
    includeUtm: true,
    batchEvents: false,
    includeReferrer: true,
  };

  loggInstance = amplitude.getInstance();
  if (loggInstance) loggInstance.init(getApiKey(), null, options);
}

type EventProperties = Record<string, unknown>;

const felles: EventProperties = {
  appname: "dp-dagpenger",
};

function loggHendelse(event: string, ekstraData?: EventProperties): LogReturn {
  if (!loggInstance) {
    return;
  }

  const data: EventProperties = {
    ...felles,
    ...ekstraData,
  };

  return loggInstance.logEvent(event, data);
}

function settBrukerEgenskaper(egenskaper: EventProperties) {
  if (!loggInstance) {
    return;
  }

  return loggInstance.setUserProperties(egenskaper);
}

export const loggError = (
  error: Error,
  ekstraData?: EventProperties
): LogReturn => {
  const data: EventProperties = {
    ...ekstraData,
    siteUrl: window.location.pathname,
    msg: error.message,
    name: error.name,
    stack: error.stack,
  };

  console.error(data);

  return loggHendelse("Error", data);
};

const vistDokumentlisten = (
  ekstraData?: EventProperties & {
    antallDagpenger: number;
    antallOppfølging: number;
    antallSøknader: number;
    antallDagerSidenSøknad: number;
  }
): LogReturn => {
  settBrukerEgenskaper({
    "antall søknader": ekstraData.antallSøknader,
    "antall dager siden søknad": ekstraData.antallDagerSidenSøknad,
    "har oppfølgingdokumenter": ekstraData.antallOppfølging > 0,
  });
  return loggHendelse("så dokumentlisten", ekstraData);
};

type DokumentHendelse = EventProperties & {
  dokumentTittel: string;
  avsender?: string;
};

const åpnetVedleggsliste = (
  ekstraData: DokumentHendelse & { antallVedlegg: number }
): LogReturn => loggHendelse("åpnet vedleggsliste", ekstraData);

const skjulteVedleggsliste = (
  ekstraData: DokumentHendelse & { antallVedlegg: number }
): LogReturn => loggHendelse("skjulte vedleggsliste", ekstraData);

const åpnetForhåndsvisning = (ekstraData: DokumentHendelse): LogReturn =>
  loggHendelse("åpnet forhåndsvisning av dokument", ekstraData);

const lukketForhåndsvisning = (
  ekstraData: DokumentHendelse & {
    visningstid: number;
  }
): LogReturn => loggHendelse("lukket forhåndsvisning av dokument", ekstraData);

const lastetNed = (ekstraData: DokumentHendelse): LogReturn =>
  loggHendelse("lastet ned dokument", ekstraData);

const klikketSnarvei = (
  ekstraData?: EventProperties & {
    snarvei: string;
  }
): LogReturn => loggHendelse("klikket på snarvei", ekstraData);

const åpnetHvorforVisesIkkeDokumentet = (
  ekstraData: DokumentHendelse
): LogReturn => loggHendelse("åpnet forklaring av skjult dokument", ekstraData);

export const logg = {
  vistDokumentlisten,
  klikketSnarvei,
  åpnetVedleggsliste,
  skjulteVedleggsliste,
  åpnetForhåndsvisning,
  lukketForhåndsvisning,
  lastetNed,
  åpnetHvorforVisesIkkeDokumentet,
};
