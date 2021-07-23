import useSWR from "swr";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";
import React from "react";
import AlertStripe from "nav-frontend-alertstriper";
import "../../node_modules/nav-frontend-typografi-style/dist/main.css";
import "../../node_modules/nav-frontend-alertstriper-style/dist/main.css";

export const Registreringsstatus = () => {
  const { data: registrering, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/arbeidssoker/perioder`
  );

  if (registrering === undefined && !error) return null;
  if (error) {
    return (
      <div style={{ marginTop: "1rem" }}>
        <FantIkkeSvaret />
      </div>
    );
  }
  const erRegistrert = registrering.arbeidssokerperioder.length;

  return (
    <div style={{ marginTop: "1rem" }}>
      {erRegistrert ? (
        <ErRegistrert />
      ) : (
        <AlertStripe type={"advarsel"}>
          <ErIkkeRegistrert />
        </AlertStripe>
      )}
    </div>
  );
};

function FantIkkeSvaret() {
  return (
    <Normaltekst>
      Du må være{" "}
      <Lenke href="https://arbeidssokerregistrering.nav.no/start">
        registrert
      </Lenke>{" "}
      som arbeidssøker og{" "}
      <Lenke href="https://www.nav.no/meldekort/">sende meldekort</Lenke> innen
      fristen. Dette gjelder også når du venter på svar på søknaden din.
    </Normaltekst>
  );
}

function ErRegistrert() {
  return (
    <Normaltekst>
      Du er registrert som arbeidssøker. For å fortsette å være registrert må du{" "}
      <Lenke href="https://www.nav.no/meldekort/">sende hvert meldekort</Lenke>{" "}
      innen fristen, også når du venter på svar på søknaden din.
    </Normaltekst>
  );
}

function ErIkkeRegistrert() {
  return (
    <Normaltekst>
      Du er ikke registrert som arbeidssøker. For å få dagpenger må du{" "}
      <Lenke href="https://arbeidssokerregistrering.nav.no/start">
        registrere deg
      </Lenke>{" "}
      og sende meldekort innen fristen. Dette gjelder også når du venter på svar
      på søknaden din.
    </Normaltekst>
  );
}
