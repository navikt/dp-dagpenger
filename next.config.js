const { buildCspHeader } = require("@navikt/nav-dekoratoren-moduler/ssr");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// Direktiver appen din benytter
const myAppDirectives = {
  "script-src-elem": ["'self'", "https://widget.uxsignals.com"],
  "script-src": ["'self'", "https://widget.uxsignals.com"],
  "style-src": ["unsafe-inline"],
  "img-src": ["'self'", "data:", "https://widget.uxsignals.com"],
  "connect-src": [
    "'self'",
    "rt6o382n.apicdn.sanity.io",
    "rt6o382n.api.sanity.io",
    "https://api.uxsignals.com",
    "https://widget.uxsignals.com",
  ],
  "worker-src": ["'self'"],
  "frame-src": ["*.nav.no"],
};

const supportedLocales = ["nb"];

const config = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  i18n: {
    locales: supportedLocales,
    defaultLocale: "nb",
  },
  assetPrefix: process.env.ASSET_PREFIX,
  experimental: {
    largePageDataBytes: 256 * 1000, // Økt fra 128KB til 256K
  },
  output: "standalone",
  swcMinify: true,
  async headers() {
    const env = process.env.NEXT_PUBLIC_LOCALHOST !== "true" ? "prod" : "dev";
    const csp = await buildCspHeader(myAppDirectives, { env });
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
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(config);
