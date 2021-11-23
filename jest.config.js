module.exports = {
  globalSetup: "<rootDir>/jest.env.js",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
    "^jose/(.*)$": "identity-obj-proxy",
    "^@navikt/dp-auth/(.*)$": "<rootDir>/node_modules/@navikt/dp-auth/dist/$1",
  },
  transformIgnorePatterns: ["/node_modules/(?!@navikt/ds-icons).+\\.js$"],
  verbose: true,
};
