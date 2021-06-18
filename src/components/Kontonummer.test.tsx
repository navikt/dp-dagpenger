/**
 * @jest-environment jsdom
 */

import { Kontonummer } from "./Kontonummer";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import api from "../utilities/api";
import { server } from "../../jest.setup";
import { Personalia } from "../pages/api/personalia";

test("viser en tekst med kontonummer og hvor det kan endres", async () => {
  server.use(
    rest.get(api("/personalia"), (req, res, ctx) => {
      const response: Personalia = { kontonummer: "AAAABBCCCCC" };
      return res(ctx.json(response));
    })
  );

  render(<Kontonummer />);

  expect(await screen.findByText(/kontonummer/)).toHaveTextContent(
    "AAAA BB CCCCC"
  );
});
