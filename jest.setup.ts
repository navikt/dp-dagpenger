import "next"; // Laster alle polyfills fra Next
import "@testing-library/jest-dom";
import { server } from "./src/__mocks__/server";

export { server };

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});
afterEach(async () => {
  server.resetHandlers();
});
afterAll(() => server.close());

jest.mock("@navikt/next-logger");
