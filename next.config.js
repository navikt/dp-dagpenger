const { buildCspHeader } = require("@navikt/nav-dekoratoren-moduler/ssr");
const withPlugins = require("next-compose-plugins");

// Direktiver appen din benytter
const myAppDirectives = {
  "script-src-elem": ["'self'", "https://uxsignals-frontend.uxsignals.app.iterate.no"],
  "script-src": ["'self'", "https://uxsignals-frontend.uxsignals.app.iterate.no"],
  "style-src": ["unsafe-inline"],
  "img-src": ["'self'", "data:", "https://uxsignals-frontend.uxsignals.app.iterate.no"],
  "connect-src": [
    "'self'",
    "rt6o382n.apicdn.sanity.io",
    "rt6o382n.api.sanity.io",
    "https://api.uxsignals.com",
  ],
  "worker-src": ["'self'"],
  "frame-src": ["*.nav.no"],
};

module.exports = async (phase) =>
  withPlugins([], {
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
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Setting `resolve.alias` to `false` will tell webpack to ignore a module.
        // `msw/node` is a server-only module that exports methods not available in
        // the `browser`.
        config.resolve.alias = {
          ...config.resolve.alias,
          "msw/node": false,
        };
      }
      return config;
    },
  })(phase, { undefined });
