import { createMocks } from "node-mocks-http";
import { handleDokumenter } from "../../../pages/api/dokumenter";
import { getSession as _getSession } from "@navikt/dp-auth/server";

jest.mock("@navikt/dp-auth/server");
const getSession = _getSession as jest.MockedFunction<typeof _getSession>;

beforeEach(() => {
  getSession.mockResolvedValue({
    token: "123",
    payload: { pid: "123123", exp: Date.now() / 1000 + 3000 },
    apiToken: async () => "foo",
  });
});
afterEach(() => getSession.mockClear());

describe("/api/dokumenter", () => {
  test("svarer med en liste dokumenter", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    // @ts-ignore MockRequest matcher ikke AuthedNextApiRequest
    await handleDokumenter(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toMatchSnapshot();
  });
});
