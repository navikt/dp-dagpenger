import "nav-frontend-alertstriper-style/dist/main.css";
import { Normaltekst } from "nav-frontend-typografi";
import React from "react";
import { Seksjon } from "./Seksjon";
import Lenke from "nav-frontend-lenker";
import { Kontonummer } from "./Kontonummer";

export default function KontonummerOgUtbetaling(): JSX.Element {
  return (
    <Seksjon tittel={"Kontonummer og utbetaling"}>
      <Normaltekst style={{ marginBottom: "1rem" }}>
        <Kontonummer />
      </Normaltekst>
      <Normaltekst>
        Hvis du får ja til dagpenger, kommer pengene på konto noen få dager
        etter du har sendt meldekortet. I svaret på søknaden vil det stå hvor
        mye du kan få utbetalt.
      </Normaltekst>
    </Seksjon>
  );
}
