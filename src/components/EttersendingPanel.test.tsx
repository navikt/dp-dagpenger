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
import { ResponseComposition, rest } from "msw";
import api from "../lib/api";
import { DedupedSWR } from "../lib/deduped-swr";
import { EttersendingResultat } from "../pages/api/ettersendelser";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    NEXT_PUBLIC_SOKNADSDIALOG: "https://arbeid.dev.nav.no/dagpenger/soknad/",
  },
}));

test("uten søknader skal det vises panel for innsending av dokument", async () => {
  server.use(
    rest.get(
      api("ettersendelser"),
      (req, res: ResponseComposition<EttersendingResultat>, ctx) => {
        return res(
          ctx.json({ results: [], successFullSources: [], failedSources: [] })
        );
      }
    )
  );

  render(<EttersendingPanel />, { wrapper: DedupedSWR });
  await waitForElementToBeRemoved(() =>
    screen.queryByRole("progressbar", {
      name: "Laster innhold",
    })
  );
  expect(screen.queryByText("Send inn dokument")).toBeInTheDocument();
});

test("lister ut digitale søknader som lenker til ettersending", async () => {
  server.use(
    rest.get(api("ettersendelser"), (req, res, ctx) => {
      return res(
        ctx.json({
          results: [
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
          ],
          successFullSources: [],
          failedSources: [],
        })
      );
    })
  );

  render(<EttersendingPanel />, { wrapper: DedupedSWR });
  const button = await waitFor(() => screen.findByRole("button"), {
    timeout: 5000,
  });
  fireEvent.click(button);

  expect(await screen.findAllByRole("listitem")).toHaveLength(3);
  expect(await screen.findByText("Send inn dokument")).toBeInTheDocument();
}, 30000);

test("lager url til ny søknadsdialog", async () => {
  server.use(
    rest.get(api("ettersendelser"), (req, res, ctx) => {
      return res(
        ctx.json({
          results: [
            {
              tittel: "Søknad om dagpenger",
              innsendtDato: "bla",
              søknadId: "3B41A7A9-4C5C-4BC5-A1EF-C2741988A973",
            },
          ],
          successFullSources: [],
          failedSources: [],
        })
      );
    })
  );

  render(<EttersendingPanel />, { wrapper: DedupedSWR });
  const button = await waitFor(() => screen.findByRole("button"), {
    timeout: 5000,
  });
  fireEvent.click(button);

  expect(
    await screen
      .getByText("Søknad om dagpenger - Sendt Invalid Date")
      // eslint-disable-next-line testing-library/no-node-access
      .closest("a")
  ).toHaveAttribute(
    "href",
    "https://arbeid.dev.nav.no/dagpenger/soknad/3B41A7A9-4C5C-4BC5-A1EF-C2741988A973/ettersending"
  );
}, 3000);
