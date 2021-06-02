import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { server } from "./src/__mocks__/server";

expect.extend(toHaveNoViolations);

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
