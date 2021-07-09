require("next"); // Laster alle polyfills fra Next
import "@testing-library/jest-dom";
import { server } from "./src/__mocks__/server";
import { cache } from "swr";

export { server };

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});
afterEach(async () => {
  await new Promise((resolve) => setTimeout(resolve.bind(null), 0));
  cache.clear();
  server.resetHandlers();
});
afterAll(() => server.close());
