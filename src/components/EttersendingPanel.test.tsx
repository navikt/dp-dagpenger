/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { EttersendingPanel } from "./EttersendingPanel";

describe("EttersendingPanel", () => {
  describe("uten søknader", () => {
    test("viser en direkte-lenke til ettersending", async () => {
      render(<EttersendingPanel soknader={[]} />);
      expect(await screen.findByRole("link")).toHaveTextContent(
        "Send inn dokument"
      );
    });
  });

  describe("med søknader", () => {
    const soknader = [
      { tittel: "S1", datoInnsendt: new Date().toISOString() },
      { tittel: "S2", datoInnsendt: new Date().toISOString() },
    ];
    const openEkspanderbartPanel = () => {
      screen.getByRole("button").click();
    };
    beforeEach(async () => {
      render(<EttersendingPanel soknader={soknader} />);
      await openEkspanderbartPanel();
    });

    test("lister ut søknadene som lenker til ettersending", async () => {
      const listItems = await screen.findAllByRole("listitem");

      expect(listItems).toHaveLength(soknader.length + 1);
    });
  });
});
