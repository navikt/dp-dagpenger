/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { Søknad } from "../pages/api/soknader";
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
    const soknader: Pick<Søknad, "datoInnsendt" | "tittel" | "kanal">[] = [
      {
        tittel: "S1",
        datoInnsendt: new Date().toISOString(),
        kanal: "Digital",
      },
      {
        tittel: "S2",
        datoInnsendt: new Date().toISOString(),
        kanal: "Digital",
      },
      { tittel: "S3", datoInnsendt: new Date().toISOString(), kanal: "Papir" },
    ];
    const openEkspanderbartPanel = () => {
      screen.getByRole("button").click();
    };
    beforeEach(async () => {
      render(<EttersendingPanel soknader={soknader} />);
      await openEkspanderbartPanel();
    });

    test("lister ut digitale søknader som lenker til ettersending", async () => {
      const listItems = await screen.findAllByRole("listitem");

      expect(listItems).toHaveLength(3);
    });
  });
});
