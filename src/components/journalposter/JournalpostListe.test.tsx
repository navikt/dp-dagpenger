/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import VanligJournalpostListe from "./JournalpostListe";
import { rest } from "msw";
import { SWRConfig } from "swr";
import { endpoint, frontendHandlers } from "../../__mocks__/handlers/frontend";
import { server } from "../../../jest.setup";

// Testene kjører så fort etter hverandre at SWR tror det er samme request
const JournalpostListe = () => (
  <SWRConfig value={{ dedupingInterval: 0, loadingTimeout: 50 }}>
    <VanligJournalpostListe />
  </SWRConfig>
);

beforeAll(() => server.resetHandlers(...frontendHandlers));

describe("DokumentListe", () => {
  it("viser ei liste av dokumenter", async () => {
    render(<JournalpostListe />);

    const headings = await screen.findAllByRole("heading");
    expect(headings).toHaveLength(5);
  });

  it.skip("gir en feilmelding når dokumenter ikke kan hentes", async () => {
    server.use(
      rest.get(endpoint("/api/dokumenter"), (req, res, ctx) =>
        res.networkError("Failed to connect")
      )
    );

    render(<JournalpostListe />);

    const actual = await screen.findByRole("alert");
    expect(actual).toHaveTextContent(/Det er ikke mulig/);
  });

  it.skip("gir en spinner mens dokumenter lastes", async () => {
    server.use(
      rest.get(endpoint("/api/dokumenter"), (req, res, ctx) =>
        res(ctx.delay(100), ctx.json([]))
      )
    );

    render(<JournalpostListe />);

    const actual = await screen.findByRole("progressbar", {
      name: "Laster innhold",
    });
    expect(actual).toHaveTextContent("Venter...");
  });
});
