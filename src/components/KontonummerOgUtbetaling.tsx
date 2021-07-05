import "nav-frontend-alertstriper-style/dist/main.css";
import { Normaltekst } from "nav-frontend-typografi";
import React from "react";
import { Seksjon } from "./Seksjon";
import { Kontonummer } from "./Kontonummer";

export default function KontonummerOgUtbetaling(): JSX.Element {
  return (
    <Seksjon tittel={"Kontonummer og utbetaling"}>
      <Normaltekst style={{ marginBottom: "1rem" }}>
        <Kontonummer />
      </Normaltekst>
    </Seksjon>
  );
}
