import { render, screen } from "@testing-library/react";
import VanligJournalpostListe from "./JournalpostListe";
import { server } from "../../__mocks__/server";
import { rest } from "msw";
import { SWRConfig } from "swr";

// Testene kjører så fort etter hverandre at SWR tror det er samme request
const JournalpostListe = () => (
  <SWRConfig value={{ dedupingInterval: 0, loadingTimeout: 50 }}>
    <VanligJournalpostListe />
  </SWRConfig>
);

describe("DokumentListe", () => {
  it("viser ei liste av dokumenter", async () => {
    render(<JournalpostListe />);

    const headings = await screen.findAllByRole("heading");
    expect(headings).toHaveLength(5);
  });

  it.only("gir en feilmelding når dokumenter ikke kan hentes", async () => {
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/api/dokumenter`,
        (req, res, ctx) => res.networkError("Failed to connect")
      )
    );

    console.log("prerender", new Date());
    render(<JournalpostListe />);
    console.log("postrender", new Date());

    const actual = await screen.findByRole("alert");
    console.log("postawait", new Date());
    expect(actual).toHaveTextContent(/Det er ikke mulig/);
  });

  it("gir en spinner mens dokumenter lastes", async () => {
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/api/dokumenter`,
        (req, res, ctx) => res(ctx.delay(20000), ctx.json({}))
      )
    );

    render(<JournalpostListe />);

    const actual = await screen.findByRole("progressbar", {
      name: "Laster innhold",
    });
    expect(actual).toHaveTextContent("Venter...");
  });
});
