const csp = {
  "default-src": ["'self'", "tjenester.nav.no", "appres.nav.no"],
  "script-src": [
    "'self'",
    "'report-sample'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "appres.nav.no",
    "www.google-analytics.com",
    "www.googletagmanager.com",
    "static.hotjar.com",
    "script.hotjar.com",
    "*.psplugin.com",
    "*.nav.no",
    "*.taskanalytics.com/tm.js",
  ],
  "style-src": [
    "'self'",
    "blob:",
    "*.nav.no",
    "appres.nav.no",
    "'unsafe-inline'",
    "fonts.googleapis.com",
    "translate.googleapis.com",
  ],
  "connect-src": [
    "'self'",
    "*.nav.no",
    "appres.nav.no",
    "amplitude.nav.no/collect",
    "*.psplugin.com",
    "*.hotjar.com",
    "*.vc.hotjar.com",
    "*.hotjar.io",
    "*.vc.hotjar.io",
    "wss://*.hotjar.com",
    "api.puzzel.com",
    "nav.boost.ai",
    "rt6o382n.api.sanity.io",
    "rt6o382n.apicdn.sanity.io",
    "sentry.gc.nav.no",
    "www.google-analytics.com",
    "ta-survey-v2.herokuapp.com",
  ],
  "font-src": [
    "data:",
    "*.psplugin.com",
    "*.hotjar.com",
    "fonts.gstatic.com",
    "www.nav.no",
  ],
  "frame-src": ["vars.hotjar.com", "*.nav.no"],
  "img-src": [
    "'self'",
    "*.hotjar.com",
    "www.google-analytics.com",
    "www.gstatic.com",
    "translate.google.com",
    "*.nav.no",
    "data:",
    "www.googletagmanager.com",
  ],
  "report-uri": [
    "https://sentry.gc.nav.no/api/86/security/?sentry_key=98d1497555654049a7d46e29a5208e61",
  ],
};

const stringified = Object.entries(csp)
  .map((entry) => `${entry[0]} ${entry[1].join(" ")}`)
  .join("; ");

module.exports = stringified;
