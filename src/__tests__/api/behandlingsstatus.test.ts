import { createMocks } from "node-mocks-http";
import { handleBehandlingsstatus } from "../../pages/api/behandlingsstatus";

describe("/api/behandlingsstatus", () => {
  test("svarer med en behandlingsstatus", async () => {
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
    await handleBehandlingsstatus(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()["status"]).toBeTruthy();
    expect(res._getData()).toMatchSnapshot();
  });
});
