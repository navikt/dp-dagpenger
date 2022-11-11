import { createMocks } from "node-mocks-http";
import { handleBehandlingsstatus } from "../../pages/api/behandlingsstatus";
import { server } from "../../../jest.setup";
import { rest } from "msw";
import { getSession as _getSession } from "../../lib/auth.utils";

jest.mock("../../lib/auth.utils");
const getSession = _getSession as jest.MockedFunction<typeof _getSession>;

beforeEach(() => {
  getSession.mockResolvedValue({
    token: "123",
    apiToken: async () => "access_token",
    expiresIn: 123,
  });
});
afterEach(() => getSession.mockClear());

describe("/api/behandlingsstatus", () => {
  test("svarer med behandlingsstatus null uten vedtak og søknad", async () => {
    med({
      antallSøknader: 0,
      antallVedtak: 0,
    });

    const res = await hentBehandlingsstatus();

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()["status"]).toBeNull();
    expect(res._getData()).toMatchSnapshot();
  });

  test("svarer med behandlingsstatus UnderBehandling med 1 søknad og 0 vedtak", async () => {
    med({
      antallSøknader: 1,
      antallVedtak: 0,
    });

    const res = await hentBehandlingsstatus();

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()["status"]).toEqual("UnderBehandling");
    expect(res._getData()).toMatchSnapshot();
  });

  test("svarer med behandlingsstatus FerdigBehandlet med 1 søknad og 1 vedtak", async () => {
    med({
      antallSøknader: 1,
      antallVedtak: 1,
    });

    const res = await hentBehandlingsstatus();

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()["status"]).toEqual("FerdigBehandlet");
    expect(res._getData()).toMatchSnapshot();
  });

  test("svarer med behandlingsstatus FerdigBehandlet med 0 søknad og 1 vedtak", async () => {
    med({
      antallSøknader: 0,
      antallVedtak: 1,
    });

    const res = await hentBehandlingsstatus();

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()["status"]).toEqual("FerdigBehandlet");
    expect(res._getData()).toMatchSnapshot();
  });

  test("svarer med behandlingsstatus FerdigBehandlet med 1 søknad og 2 vedtak", async () => {
    med({
      antallSøknader: 1,
      antallVedtak: 2,
    });

    const res = await hentBehandlingsstatus();

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()["status"]).toEqual("FerdigBehandlet");
    expect(res._getData()).toMatchSnapshot();
  });

  test("svarer med behandlingsstatus UnderOgFerdigBehandlet med 2 søknad og 1 vedtak", async () => {
    med({
      antallSøknader: 2,
      antallVedtak: 1,
    });

    const res = await hentBehandlingsstatus();

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()["status"]).toEqual("UnderOgFerdigBehandlet");
    expect(res._getData()).toMatchSnapshot();
  });

  test("med manglende body", async () => {
    server.use(
      rest.get("http://dp-innsyn/soknad", (req, res, ctx) => {
        return res(ctx.json(new Array(2)));
      })
    );
    server.use(
      rest.get("http://dp-innsyn/vedtak", (req, res, ctx) => {
        return res(ctx.text(""));
      })
    );

    const res = await hentBehandlingsstatus();

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()["status"]).toEqual(null);
    expect(res._getData()).toMatchSnapshot();
  });

  function med({
    antallSøknader,
    antallVedtak,
  }: {
    antallSøknader: number;
    antallVedtak: number;
  }) {
    server.use(
      rest.get("http://dp-innsyn/soknad", (req, res, ctx) => {
        expect(req.headers.get("Authorization")).toMatch(/access_token/);
        return res(ctx.json(new Array(antallSøknader)));
      })
    );
    server.use(
      rest.get("http://dp-innsyn/vedtak", (req, res, ctx) => {
        expect(req.headers.get("Authorization")).toMatch(/access_token/);
        return res(ctx.json(new Array(antallVedtak)));
      })
    );
  }

  async function hentBehandlingsstatus() {
    const { req, res } = createMocks({
      method: "GET",
    });

    // @ts-ignore MockRequest matcher ikke AuthedNextApiRequest
    await handleBehandlingsstatus(req, res);
    return res;
  }
});
