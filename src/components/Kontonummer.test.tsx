/**
 * @jest-environment jsdom
 */

import { Kontonummer } from "./Kontonummer";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import api from "../lib/api";
import { server } from "../../jest.setup";
import { Personalia } from "../pages/api/personalia";
import { DedupedSWR } from "../lib/deduped-swr";

test("viser en tekst med kontonummer og hvor det kan endres", async () => {
  server.use(
    rest.get(api("/personalia"), (req, res, ctx) => {
      const response: Personalia = { kontonummer: "AAAABBCCCCC" };
      return res(ctx.json(response));
    })
  );

  render(<Kontonummer />, { wrapper: DedupedSWR });

  expect(await screen.findByText(/kontonummeret hos NAV/)).toHaveTextContent(
    "AAAA BB CCCCC"
  );
});
