const { buildCspHeader } = require("@navikt/nav-dekoratoren-moduler/ssr");
const withPlugins = require("next-compose-plugins");
//const { withSentryConfig } = require("@sentry/nextjs");
const withTM = require("next-transpile-modules")(["@navikt/ds-icons"]);

// Direktiver appen din benytter
const myAppDirectives = {
  "default-src": ["'self'"],
  "script-src-elem": ["'self'"],
  "img-src": ["'self'", "data:"],
  "connect-src": [
    "'self'",
    "rt6o382n.apicdn.sanity.io",
    "rt6o382n.api.sanity.io",
  ],
  "worker-src": ["self"],
  "report-uri":
    "https://sentry.gc.nav.no/api/86/security/?sentry_key=98d1497555654049a7d46e29a5208e61",
};

module.exports = withPlugins([withTM], {
  //withSentryConfig(
  publicRuntimeConfig: {
    amplitudeKey: process.env.AMPLITUDE_API_KEY,
    NEXT_PUBLIC_SOKNADSDIALOG: process.env.NEXT_PUBLIC_SOKNADSDIALOG,
  },
  basePath: `${process.env.NEXT_PUBLIC_BASE_PATH}`,
  async headers() {
    const csp = await buildCspHeader(myAppDirectives, {
      env: process.env.DEKORATOR_ENV,
    });

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
