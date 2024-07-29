/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { server } from "../../../vitestSetup";
import SanityProvider from "../../context/sanity-context";
import api from "../../lib/api";
import { DedupedSWR } from "../../lib/deduped-swr";
import { Konto } from "../../pages/api/konto";
import { AccountNumber } from "./AccountNumber";
import { sanityContextInitialStateMock } from "../../sanity/sanity-mocks";

test.skip("Should show tekst and formatted account number", async () => {
  server.use(
    http.get(api("/konto"), () => {
      const response: Konto = { kontonummer: "AAAABBCCCCC" };
      return HttpResponse.json(response);
    }),
  );

  render(
    <SanityProvider initialState={sanityContextInitialStateMock}>
      <AccountNumber />
    </SanityProvider>,

    { wrapper: DedupedSWR },
  );

  await waitFor(() => {
    expect(screen.getByText(/AAAA BB CCCCC/i)).toBeInTheDocument();
  });
});
