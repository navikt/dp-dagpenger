/**
 * @jest-environment jsdom
 */

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import JournalpostListe from "./JournalpostListe";
import { rest } from "msw";
import { frontendHandlers } from "../../__mocks__/handlers/frontend";
import { server } from "../../../jest.setup";
import api from "../../lib/api";
import { DedupedSWR } from "../../lib/deduped-swr";

jest.mock("amplitude-js");

test("viser ei liste av dokumenter", async () => {
  server.use(...frontendHandlers);

  render(<JournalpostListe />, { wrapper: DedupedSWR });

  // 10 mockede dokumenter + 1 heading på seksjonen
  expect(await screen.findAllByRole("heading")).toHaveLength(11);
});

test("gir en feilmelding når dokumenter ikke kan hentes", async () => {
  server.use(
    rest.get(api("/dokumenter"), (req, res) => {
      return res.networkError("Failed to connect");
    })
  );

  render(<JournalpostListe />, { wrapper: DedupedSWR });

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

  render(<JournalpostListe />, { wrapper: DedupedSWR });

  await waitForElementToBeRemoved(() =>
    screen.queryByRole("progressbar", {
      name: "Laster innhold",
    })
  );
});
