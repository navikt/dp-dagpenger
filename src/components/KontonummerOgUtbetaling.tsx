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
        Hvis du får innvilget dagpenger, vil du få informasjon i vedtaket om
        hvor mye du får utbetalt før skatt. Du får dagpenger for fem virkedager
        per uke, også om disse er helligdager. Når du sender meldekort, gir du
        informasjon til NAV slik at vi kan beregne utbetalingen din. Du får
        penger på konto få dager etter du har sendt meldekortet.{" "}
        <Lenke href={"https://tjenester.nav.no/utbetalingsoversikt/"}>
          Se dine utbetalinger
        </Lenke>
      </Normaltekst>
    </Seksjon>
  );
}
