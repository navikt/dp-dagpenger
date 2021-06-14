/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import VanligJournalpostListe from "./JournalpostListe";
import { rest } from "msw";
import { SWRConfig } from "swr";
import { endpoint, frontendHandlers } from "../../__mocks__/handlers/frontend";
import { server } from "../../../jest.setup";

jest.mock("amplitude-js");

// Testene kjører så fort etter hverandre at SWR tror det er samme request
const JournalpostListe = () => (
  <SWRConfig value={{ dedupingInterval: 0 }}>
    <VanligJournalpostListe />
  </SWRConfig>
);

beforeAll(() => server.resetHandlers(...frontendHandlers));

describe("DokumentListe", () => {
  it.only("viser ei liste av dokumenter", async () => {
    render(<JournalpostListe />);

    const headings = await screen.findAllByRole("heading");
    expect(headings).toHaveLength(5);
  });

  it("gir en feilmelding når dokumenter ikke kan hentes", async () => {
    server.use(
      rest.get(endpoint("/api/dokumenter"), (req, res) =>
        res.networkError("Failed to connect")
      )
    );

    render(<JournalpostListe />);

    const actual = await screen.findByRole("alert");
    expect(actual).toHaveTextContent(/Det er ikke mulig/);
  });

  it("gir en spinner mens dokumenter lastes", (done) => {
    server.use(
      rest.get(endpoint("/api/dokumenter"), async (req, res, ctx) => {
        const actual = await screen.findByRole("progressbar", {
          name: "Laster innhold",
        });
        expect(actual).toHaveTextContent("Venter...");

        done();
        return res(ctx.json([]));
      })
    );

    render(<JournalpostListe />);
  });
});
