const withLess = require("@zeit/next-less");
const withTM = require("next-transpile-modules")(navFrontendModuler());
const csp = require("./src/.csp");

function navFrontendModuler() {
  return Object.keys(require("./package.json").dependencies).filter(
    (it) => it.startsWith("nav-") || it.startsWith("@navikt/")
  );
}

module.exports = withLess(
  withTM({
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
