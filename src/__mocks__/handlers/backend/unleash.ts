import { HttpResponse, delay } from "msw";

export async function unleashResolver() {
  const toggle = {
    version: 1,
    features: [
      {
        name: "dagpenger.ny-soknadsdialog-innsyn-ny-soknad-er-aapen-lokalt",
        type: "release",
        enabled: true,
        stale: false,
        strategies: [{ name: "default", parameters: {} }],
        variants: [],
      },
      {
        name: "dagpenger.ny-soknadsdialog-innsyn-vis-generell-innsending-lokalt",
        type: "release",
        enabled: true,
        stale: false,
        strategies: [{ name: "default", parameters: {} }],
        variants: [],
      },
    ],
  };

  await delay();
  return HttpResponse.json(toggle);
}
