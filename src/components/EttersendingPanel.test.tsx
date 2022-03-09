/**
 * @jest-environment jsdom
 */

import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { EttersendingPanel } from "./EttersendingPanel";
import { server } from "../__mocks__/server";
import { rest } from "msw";
import api from "../lib/api";
import { DedupedSWR } from "../lib/deduped-swr";

test("uten søknader viser en direkte-lenke til ettersending", async () => {
  server.use(
    rest.get(api("ettersendelser"), (req, res, ctx) => {
      return res(ctx.json([]));
    })
  );

  render(<EttersendingPanel />, { wrapper: DedupedSWR });
  await waitForElementToBeRemoved(() =>
    screen.queryByRole("progressbar", {
      name: "Laster innhold",
    })
  );
  expect(await screen.findByRole("link")).toHaveTextContent(
    "Send inn dokument"
  );
});

test("lister ut digitale søknader som lenker til ettersending", async () => {
  server.use(
    rest.get(api("ettersendelser"), (req, res, ctx) => {
      return res(
        ctx.json([
          {
            tittel: "S1",
            innsendtDato: new Date().toISOString(),
            søknadId: "111",
          },
          {
            tittel: "S2",
            innsendtDato: new Date().toISOString(),
            søknadId: "222",
          },
          {
            tittel: "S3",
            innsendtDato: new Date().toISOString(),
            søknadId: "333",
          },
        ])
      );
    })
  );

  render(<EttersendingPanel />, { wrapper: DedupedSWR });
  const button = await waitFor(() => screen.findByRole("button"), {
    timeout: 5000,
  });
  fireEvent.click(button);

  expect(await screen.findAllByRole("listitem")).toHaveLength(3);
}, 30000);
