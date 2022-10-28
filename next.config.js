const csp = require("./src/.csp");

const withPlugins = require("next-compose-plugins");
//const { withSentryConfig } = require("@sentry/nextjs");
const withTM = require("next-transpile-modules")(["@navikt/ds-icons"]);

module.exports = withPlugins([withTM], {
  //withSentryConfig(
  publicRuntimeConfig: {
    amplitudeKey: process.env.AMPLITUDE_API_KEY,
    NEXT_PUBLIC_SOKNADSDIALOG: process.env.NEXT_PUBLIC_SOKNADSDIALOG,
  },
  basePath: `${process.env.NEXT_PUBLIC_BASE_PATH}`,
  async headers() {
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
  async redirects() {
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
/*,
{ silent: true }
);*/
