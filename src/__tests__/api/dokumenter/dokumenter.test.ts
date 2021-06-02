import { createMocks } from "node-mocks-http";
import { handleDokumenter } from "../../../pages/api/dokumenter";

describe("/api/dokumenter", () => {
  test("svarer med en liste dokumenter", async () => {
    const { req, res } = createMocks({
      method: "GET",
      user: {
        fnr: "123123123",
        tokenset: {
          access_token: "123",
        },
        tokenFor: (token) => token,
      },
    });

    // @ts-ignore MockRequest matcher ikke AuthedNextApiRequest
    await handleDokumenter(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toMatchSnapshot();
  });
});
