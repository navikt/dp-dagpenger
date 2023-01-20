/**
 * @jest-environment jsdom
 */
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../../jest.setup";
import { frontendHandlers } from "../../__mocks__/handlers/frontend";
import SanityProvider from "../../context/sanity-context";
import api from "../../lib/api";
import { DedupedSWR } from "../../lib/deduped-swr";
import { JournalpostList } from "./JournalpostList";

jest.mock("amplitude-js");

const sanityContextInitialState = {
  appTexts: [],
  richTexts: [],
};

test("viser ei liste av dokumenter", async () => {
  server.use(...frontendHandlers);

  render(
    <SanityProvider initialState={sanityContextInitialState}>
      <JournalpostList />
    </SanityProvider>,
    { wrapper: DedupedSWR }
  );

  // 10 mockede dokumenter + 1 heading på seksjonen
  expect(await screen.findAllByRole("heading")).toHaveLength(11);
});

test.skip("gir en feilmelding når dokumenter ikke kan hentes", async () => {
  server.use(
    rest.get(api("/dokumenter"), (req, res) => {
      return res.networkError("Failed to connect");
    })
  );

  render(
    <SanityProvider initialState={sanityContextInitialState}>
      <JournalpostList />
    </SanityProvider>,
    { wrapper: DedupedSWR }
  );

  const getDocumentsError = screen.getByTestId(
    "get-documents-error"
  ) as HTMLElement;

  await waitFor(() => {
    expect(getDocumentsError).toBeInTheDocument();
  });
});

test("gir en spinner mens dokumenter lastes", async () => {
  server.use(
    rest.get(api("/dokumenter"), async (req, res, ctx) => {
      return res(ctx.delay(250), ctx.json([]));
    })
  );

  render(
    <SanityProvider initialState={sanityContextInitialState}>
      <JournalpostList />
    </SanityProvider>,
    { wrapper: DedupedSWR }
  );

  const getDocumentsLoader = screen.getByTestId(
    "get-documents-loader"
  ) as HTMLElement;

  await waitFor(() => {
    expect(getDocumentsLoader).toBeInTheDocument();
  });
});
