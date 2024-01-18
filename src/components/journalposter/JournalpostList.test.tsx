/**
 * @jest-environment jsdom
 */
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { HttpResponse, delay, http } from "msw";
import { server } from "../../../vitestSetup";
import { frontendHandlers } from "../../__mocks__/handlers/frontend";
import SanityProvider from "../../context/sanity-context";
import api from "../../lib/api";
import { DedupedSWR } from "../../lib/deduped-swr";
import { JournalpostList } from "./JournalpostList";
import { sanityContextInitialStateMock } from "../../sanity/sanity-mocks";

vi.mock("amplitude-js");

test("viser ei liste av dokumenter", async () => {
  server.use(...frontendHandlers);

  render(
    <SanityProvider initialState={sanityContextInitialStateMock}>
      <JournalpostList />
    </SanityProvider>,
    { wrapper: DedupedSWR },
  );

  // 10 mockede dokumenter + 1 heading på seksjonen
  expect(await screen.findAllByRole("heading")).toHaveLength(11);
});

test("gir en feilmelding når dokumenter ikke kan hentes", async () => {
  server.use(
    http.get(api("/dokumenter"), () => {
      return HttpResponse.error();
    }),
  );

  render(
    <SanityProvider initialState={sanityContextInitialStateMock}>
      <JournalpostList />
    </SanityProvider>,
    { wrapper: DedupedSWR },
  );

  const getDocumentsLoader = screen.getByTitle("journalpost.laster-innhold");
  await waitForElementToBeRemoved(getDocumentsLoader);

  const getDocumentError = screen.getByText(
    "journalpost.feil-ved-henting-av-dokumenter",
  );

  expect(getDocumentError).toBeInTheDocument();
});

test("gir en spinner mens dokumenter lastes", async () => {
  server.use(
    http.get(api("/dokumenter"), async () => {
      await delay(250);
      return HttpResponse.json([]);
    }),
  );

  render(
    <SanityProvider initialState={sanityContextInitialStateMock}>
      <JournalpostList />
    </SanityProvider>,
    { wrapper: DedupedSWR },
  );

  const getDocumentsLoader = screen.getByTitle("journalpost.laster-innhold");

  expect(getDocumentsLoader).toBeInTheDocument();
});
