const withLess = require("@zeit/next-less");
const csp = require("./src/.csp");

const navFrontendModuler = Object.keys(
  require("./package.json").dependencies
).filter((it) => it.startsWith("nav-") || it.startsWith("@navikt/"));

const withTranspileModules = require("next-transpile-modules")(
  navFrontendModuler
);

module.exports = withTranspileModules(
  withLess({
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
  })
);
