import "@testing-library/jest-dom";
import { vi } from "vitest";
import { server } from "./src/__mocks__/server";

export { server };

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

afterEach(async () => {
  server.resetHandlers();
});

afterAll(() => server.close());

vi.mock("@navikt/next-logger");
