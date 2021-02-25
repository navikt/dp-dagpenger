const withLess = require("@zeit/next-less");
const withCss = require("@zeit/next-css");
const withTM = require("next-transpile-modules")(navFrontendModuler());
const csp = require("./src/.csp");

function navFrontendModuler() {
  return Object.keys(require("./package.json").dependencies).filter(
    (it) => it.startsWith("nav-") || it.startsWith("@navikt/")
  );
}

module.exports = withCss(
  withLess(
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
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
      },
    })
  )
);
