import { collectDefaultMetrics, Counter } from "prom-client";

declare global {
  // eslint-disable-next-line no-var
  var _metrics: AppMetrics;
}

export class AppMetrics {
  constructor() {
    collectDefaultMetrics();
  }

  public ettersendinger = new Counter({
    name: "dp_dagpenger_utlisting_ettersending",
    help: "Hvor mange søknader er listet ut med ettersending",
    labelNames: ["generasjon", "innenfor12Uker"],
  });
}

global._metrics = global._metrics || new AppMetrics();

export default global._metrics;
