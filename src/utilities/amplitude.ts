let loggInstance;

if (typeof window !== "undefined") {
  const amplitude = require("amplitude-js");

  const getApiKey = () => process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

  loggInstance = amplitude.getInstance();
  loggInstance.init(getApiKey(), "", {
    apiEndpoint: "amplitude.nav.no/collect",
    saveEvents: false,
    includeUtm: true,
    batchEvents: false,
    includeReferrer: true,
  });
}

const felles = {
  appName: "dp-dagpenger",
};

function logg(event: string, ekstraData?: object) {
  if (!loggInstance) {
    console.error(
      "Amplitude er ikke satt opp. Du må sannsynligvis opp API key i environment"
    );
    return;
  }

  const data = {
    ...felles,
    ...ekstraData,
    appname: "dp-dagpenger",
  };

  loggInstance.logEvent(event, data);
}

export const loggError = (error: Error, ekstraData?: object) => {
  const data = {
    ...ekstraData,
    siteUrl: window.location.pathname,
    msg: error.message,
    name: error.name,
    stack: error.stack,
  };

  console.error(data);

  return logg("Error", data);
};

export const loggStatusSjekk = (ekstraData?: object) =>
  logg("dagpenger.søknad.sjekkStatus", ekstraData);

export const loggTrekkSøknad = (ekstraData?: object) =>
  logg("dagpenger.søknad.trekk", ekstraData);
