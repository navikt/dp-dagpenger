/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../../jest.setup";
import SanityProvider from "../../context/sanity-context";
import api from "../../lib/api";
import { DedupedSWR } from "../../lib/deduped-swr";
import { Konto } from "../../pages/api/konto";
import { AccountNumber } from "./AccountNumber";

const sanityContextInitialState = {
  appTexts: [],
  richTexts: [],
};

test("Should show tekst and formatted account number", async () => {
  server.use(
    rest.get(api("/konto"), (req, res, ctx) => {
      const response: Konto = { kontonummer: "AAAABBCCCCC" };
      return res(ctx.json(response));
    })
  );

  render(
    <SanityProvider initialState={sanityContextInitialState}>
      <AccountNumber />
    </SanityProvider>,

    { wrapper: DedupedSWR }
  );

  const accountNumber = screen.getByTestId("account-number") as HTMLElement;

  await waitFor(() => {
    expect(accountNumber).toHaveTextContent("AAAA BB CCCCC");
  });
});
