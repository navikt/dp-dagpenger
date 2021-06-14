require("next"); // Laster alle polyfills fra Next
import "@testing-library/jest-dom";
import { server } from "./src/__mocks__/server";
import { cache } from "swr";

export { server };

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});
afterEach(() => {
  cache.clear(); // Vi må tømme cachen til SWR for hver test
  server.resetHandlers();
});
afterAll(() => server.close());
