const { Issuer } = require("openid-client");
const csp = require("./src/.csp");

const withReactSvg = require("next-react-svg");
const path = require("path");

module.exports = withReactSvg({
  include: path.resolve(__dirname, "node_modules/@navikt/ds-icons/svg"),
  basePath: "",
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
