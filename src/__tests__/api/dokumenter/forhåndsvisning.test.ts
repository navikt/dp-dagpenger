import { createMocks } from "node-mocks-http";
import { handleHentDokument } from "../../../pages/api/dokumenter/[journalpostId]/[dokumentId]/forhandsvisning";

describe("/api/dokumenter/[journalpostId]/[dokumentId]/forhandsvisning", () => {
  test("svarer med en liste dokumenter", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        journalpostId: 123,
        dokumentId: 345,
      },
      user: {
        fnr: "123123123",
        tokenset: {
          access_token: "123",
        },
        tokenFor: (token) => token,
      },
    });

    // @ts-ignore MockRequest matcher ikke AuthedNextApiRequest
    await handleHentDokument(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toMatchSnapshot();
  });
});
