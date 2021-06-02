require("next"); // Laster alle polyfills fra Next
import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { cache } from "swr";
import { server } from "./src/__mocks__/server";

expect.extend(toHaveNoViolations);

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => {
  cache.clear(); // Vi må tømme cachen til SWR for hver test
  server.resetHandlers();
});
afterAll(() => server.close());
