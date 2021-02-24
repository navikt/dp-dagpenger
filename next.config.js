
const withLess = require("@zeit/next-less");

const navFrontendModuler = Object.keys(require("./package.json").dependencies).filter(
    (it) => it.startsWith("nav-") || it.startsWith("@navikt/")
);

const withTranspileModules = require("next-transpile-modules")(navFrontendModuler);

const csp = require("./csp");

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
            localeDetection: false, // vi har ikke bra nok engelsk språkstøtte til at dette er bra
        },
    })
);