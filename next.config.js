const { Issuer } = require("openid-client");
const csp = require("./src/.csp");

module.exports = {
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
};
