const csp = {
  "default-src": ["'self'", "tjenester.nav.no", "appres.nav.no"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "appres.nav.no",
    "www.google-analytics.com",
    "www.googletagmanager.com",
    "static.hotjar.com",
    "script.hotjar.com",
    "*.psplugin.com",
    "*.nav.no",
  ],
  "style-src": [
    "'self'",
    "blob:",
    "*.nav.no",
    "appres.nav.no",
    "'unsafe-inline'",
    "fonts.googleapis.com",
  ],
  "connect-src": [
    "'self'",
    "*.nav.no",
    "appres.nav.no",
    "amplitude.nav.no/collect",
    "*.psplugin.com",
    "*.hotjar.com",
    "*.vc.hotjar.com",
    "api.puzzel.com",
    "nav.boost.ai",
    "rt6o382n.api.sanity.io",
    "rt6o382n.apicdn.sanity.io",
  ],
  "font-src": ["data:", "*.psplugin.com", "*.hotjar.com", "fonts.gstatic.com"],
  "frame-src": [
    "video.qbrick.com/",
    "vars.hotjar.com",
    "player.vimeo.com",
    "*.nav.no",
  ],
  "img-src": [
    "'self'",
    "*.hotjar.com",
    "www.google-analytics.com",
    "*.nav.no",
    "data:",
  ],
};

const stringified = Object.entries(csp)
  .map((entry) => `${entry[0]} ${entry[1].join(" ")}`)
  .join("; ");

module.exports = stringified;
