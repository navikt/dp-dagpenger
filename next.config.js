const { Issuer } = require("openid-client");
const csp = require("./src/.csp");

const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@navikt/ds-icons"]);

module.exports = withPlugins([withTM], {
  future: {
    webpack5: true,
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
  i18n: {
    locales: ["no", "en"],
    defaultLocale: "no",
    localeDetection: false,
  },
});
