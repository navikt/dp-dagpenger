/**
 * @jest-environment jsdom
 */
import React from "react";
import { Kontonummer } from "./Kontonummer";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import api from "../lib/api";
import { server } from "../../jest.setup";
import { Konto } from "../pages/api/konto";
import { DedupedSWR } from "../lib/deduped-swr";

test("viser en tekst med kontonummer og hvor det kan endres", async () => {
  server.use(
    rest.get(api("/konto"), (req, res, ctx) => {
      const response: Konto = { kontonummer: "AAAABBCCCCC" };
      return res(ctx.json(response));
    })
  );

  render(<Kontonummer />, { wrapper: DedupedSWR });

  expect(await screen.findByText(/kontonummeret hos NAV/)).toHaveTextContent(
    "AAAA BB CCCCC"
  );
});
