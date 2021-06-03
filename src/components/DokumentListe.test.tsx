import { logRoles, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import VanligDokumentListe from "./DokumentListe";
import { server } from "../__mocks__/server";
import { rest } from "msw";
import { SWRConfig } from "swr";

// Testene kjører så fort etter hverandre at SWR tror det er samme request
const DokumentListe = () => (
  <SWRConfig value={{ dedupingInterval: 0 }}>
    <VanligDokumentListe />
  </SWRConfig>
);

describe("DokumentListe", () => {
  it.skip("bryter ingen krav om universell utforming", async () => {
    const element = render(<DokumentListe />);
    expect(await axe(element.container)).toHaveNoViolations();
  });

  it("viser ei liste av dokumenter", async () => {
    render(<DokumentListe />);

    const headings = await screen.findAllByRole("heading");
    expect(headings).toHaveLength(5);
  });

  it("gir en feilmelding når dokumenter ikke kan hentes", async () => {
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/api/dokumenter`,
        (req, res, ctx) => res.networkError("Failed to connect")
      )
    );

    render(<DokumentListe />);

    const actual = await screen.findByRole("alert");
    expect(actual).toHaveTextContent(/Det er ikke mulig/);
  });

  it("gir en spinner mens dokumenter lastes", async () => {
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/api/dokumenter`,
        (req, res, ctx) => res(ctx.delay(2000), ctx.json({}))
      )
    );

    render(<DokumentListe />);

    const actual = await screen.findByRole("progressbar", {
      name: "Laster innhold",
    });
    expect(actual).toHaveTextContent("Venter...");
  });
});
