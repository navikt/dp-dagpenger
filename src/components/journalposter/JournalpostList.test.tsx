/**
 * @jest-environment jsdom
 */
import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { JournalpostList } from "./JournalpostList";
import { rest } from "msw";
import { frontendHandlers } from "../../__mocks__/handlers/frontend";
import { server } from "../../../jest.setup";
import api from "../../lib/api";
import { DedupedSWR } from "../../lib/deduped-swr";
import SanityProvider from "../../context/sanity-context";

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

  expect(
    await screen.findByText(
      "Det er ikke mulig å hente dine dokumenter akkurat nå, vennligst prøv igjen senere."
    )
  ).toBeInTheDocument();
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

  await waitForElementToBeRemoved(() => screen.queryByTitle("Laster innhold"));
});
