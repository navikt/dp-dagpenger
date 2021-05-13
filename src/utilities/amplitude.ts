import getConfig from "next/config";
import { AmplitudeClient, Config } from "amplitude-js";

const { publicRuntimeConfig } = getConfig();

let loggInstance: AmplitudeClient;

if (typeof window !== "undefined") {
  const amplitude = require("amplitude-js");

  const getApiKey = () =>
    process.env.AMPLITUDE_API_KEY || publicRuntimeConfig.amplitudeKey;

  const options: Config = {
    apiEndpoint: "amplitude.nav.no/collect",
    saveEvents: false,
    includeUtm: true,
    batchEvents: false,
    includeReferrer: true,
  };

  loggInstance = amplitude.getInstance();
  loggInstance.init(getApiKey(), null, options);
}

type EventProperties = Record<string, unknown>;

const felles: EventProperties = {
  appname: "dp-dagpenger",
};

function logg(event: string, ekstraData?: EventProperties) {
  if (!loggInstance) {
    console.error("Amplitude er ikke satt opp");
    return;
  }

  const data: EventProperties = {
    ...felles,
    ...ekstraData,
    appname: "dp-dagpenger",
  };

  loggInstance.logEvent(event, data);
}

export const loggError = (error: Error, ekstraData?: EventProperties) => {
  const data: EventProperties = {
    ...ekstraData,
    siteUrl: window.location.pathname,
    msg: error.message,
    name: error.name,
    stack: error.stack,
  };

  console.error(data);

  return logg("Error", data);
};

export const loggStatusSjekk = (ekstraData?: EventProperties) =>
  logg("dagpenger.søknad.sjekkStatus", ekstraData);
