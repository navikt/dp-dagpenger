const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", "/src/__mocks__"],
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "src/lib/**/*.{ts,tsx}",
    "src/pages/**/*.{ts,tsx}",
  ],
  transformIgnorePatterns: ["/node_modules/(?!@navikt/ds-icons).+\\.js$"],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
    "^jose/(.*)$": "identity-obj-proxy",
    "^@navikt/dp-auth/(.*)$": "<rootDir>/node_modules/@navikt/dp-auth/dist/$1",
  },
  testEnvironment: "node",
  roots: ["src"],
};

module.exports = createJestConfig(customJestConfig);

/*module.exports = {
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
};*/
