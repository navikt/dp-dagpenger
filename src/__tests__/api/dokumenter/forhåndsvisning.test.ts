import { createMocks } from "node-mocks-http";
import handleHentDokument from "../../../pages/api/dokumenter/[journalpostId]/[dokumentId]/forhandsvisning";
import { getSession as _getSession } from "../../../lib/auth.utils";
import type { MockedFunction } from "vitest";

vi.mock("../../../lib/auth.utils");
const getSession = _getSession as MockedFunction<typeof _getSession>;

beforeEach(() => {
  getSession.mockResolvedValue({
    token: "123",
    apiToken: async () => "access_token",
    expiresIn: 123,
  });
});
afterEach(() => getSession.mockClear());

describe("/api/dokumenter/[journalpostId]/[dokumentId]/forhandsvisning", () => {
  test("svarer med en liste dokumenter", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        journalpostId: 123,
        dokumentId: 345,
      },
    });

    // @ts-ignore MockRequest matcher ikke AuthedNextApiRequest
    await handleHentDokument(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toMatchSnapshot();
  });
});
