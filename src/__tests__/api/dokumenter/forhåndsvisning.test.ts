import { createMocks } from "node-mocks-http";
import { handleHentDokument } from "../../../pages/api/dokumenter/[journalpostId]/[dokumentId]/forhandsvisning";
import { getSession as _getSession } from "@navikt/dp-auth/server";

jest.mock("@navikt/dp-auth/server");
const getSession = _getSession as jest.MockedFunction<typeof _getSession>;

beforeEach(() => {
  getSession.mockResolvedValue({
    token: "123",
    payload: { exp: Date.now() / 1000 + 3000 },
    apiToken: async () => "foo",
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
