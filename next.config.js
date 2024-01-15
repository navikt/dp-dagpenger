const { buildCspHeader } = require("@navikt/nav-dekoratoren-moduler/ssr");
const withPlugins = require("next-compose-plugins");

// Direktiver appen din benytter
const myAppDirectives = {
  "script-src-elem": ["'self'"],
  "script-src": ["'self'"],
  "img-src": ["'self'", "data:"],
  "connect-src": ["'self'", "rt6o382n.apicdn.sanity.io", "rt6o382n.api.sanity.io"],
  "worker-src": ["'self'"],
  "frame-src": ["*.nav.no"],
};

module.exports = async (phase) =>
  withPlugins([], {
    publicRuntimeConfig: {
      amplitudeKey: process.env.AMPLITUDE_API_KEY,
      NEXT_PUBLIC_SOKNADSDIALOG: process.env.NEXT_PUBLIC_SOKNADSDIALOG,
    },
    basePath: `${process.env.NEXT_PUBLIC_BASE_PATH}`,
    output: "standalone",
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
  })(phase, { undefined });
