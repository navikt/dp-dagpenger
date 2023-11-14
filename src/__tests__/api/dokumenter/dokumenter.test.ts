import { createMocks } from "node-mocks-http";
import { handleDokumenter } from "../../../pages/api/dokumenter";
import { getSession as _getSession } from "../../../lib/auth.utils";

jest.mock("../../../lib/auth.utils");
const getSession = _getSession as jest.MockedFunction<typeof _getSession>;

beforeEach(() => {
  getSession.mockResolvedValue({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwaWQiOiIxMjMxMjMxMjMifQ.XdPmoIvLFmgz51eH_05WBNOllgWEtp9kYHkWAHqMwEc",
    apiToken: async () => "access_token",
    expiresIn: 123,
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
