const csp = require("./src/.csp");

const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@navikt/ds-icons"]);

module.exports = withPlugins([withTM], {
  future: {
    webpack5: true,
  },
  publicRuntimeConfig: {
    amplitudeKey: process.env.AMPLITUDE_API_KEY,
  },
  basePath: `${process.env.NEXT_PUBLIC_BASE_PATH}`,
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
  redirects() {
    return [
      {
        source: "/app/tema(.*)",
        destination: "/",
        permanent: false,
      },
    ];
  },
  i18n: {
    locales: ["no", "en"],
    defaultLocale: "no",
    localeDetection: false,
  },
});
