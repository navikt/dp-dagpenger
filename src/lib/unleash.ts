import { Context, initialize } from "unleash-client";

export const currentCluster = process.env.NAIS_CLUSTER_NAME ?? "lokalt";

const unleash = initialize({
  url: "https://unleash.nais.io/api/",
  appName:
    `${process.env.NAIS_APP_NAME}-${process.env.NAIS_CLUSTER_NAME}` ??
    "dp-soknad-innsyn-lokalt",
  environment: currentCluster,
});

unleash.on("count", (name, enabled) =>
  console.log(`isUnleashEnabled(${name}) ? ${enabled}`)
);

export function isToggleEnabled(feature: string, context?: Context): boolean {
  return unleash.isEnabled(feature, context);
}
