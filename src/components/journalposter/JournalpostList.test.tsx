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

test("gir en feilmelding når dokumenter ikke kan hentes", async () => {
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

  const getDocumentsLoader = screen.getByTitle("journalpost.laster-innhold");
  await waitForElementToBeRemoved(getDocumentsLoader);

  const getDocumentError = screen.getByText(
    "journalpost.feil-ved-henting-av-dokumenter"
  );

  expect(getDocumentError).toBeInTheDocument();
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

  const getDocumentsLoader = screen.getByTitle("journalpost.laster-innhold");

  expect(getDocumentsLoader).toBeInTheDocument();
});
