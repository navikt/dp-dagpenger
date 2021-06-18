import useSWR from "swr";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";
import AlertStripe from "nav-frontend-alertstriper";
import React from "react";

export const Registreringsstatus = () => {
  const { data: registrering, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/registrering`,
    (url) =>
      fetch(url).then((r) => {
        if (r.status == 204) return false;
        return r.json();
      })
  );
  const type = registrering ? "info" : "advarsel";

  return (
    <div style={{ marginTop: "1rem" }}>
      {registrering || error ? (
        error ? (
          fantIkkeSvaret()
        ) : (
          erRegistrert()
        )
      ) : (
        <AlertStripe type={type}>{erIkkeRegistrert()}</AlertStripe>
      )}
    </div>
  );
};

function fantIkkeSvaret() {
  return (
    <Normaltekst>
      Du må være registert som arbeidssøker og{" "}
      <Lenke href="https://www.nav.no/meldekort/">sende hvert meldekort</Lenke>{" "}
      innen fristen, for å ha rett til dagpenger. Dette gjelder også når du
      venter på svar på søknaden din. Hvis du ikke sender meldekort kan du miste
      rett til dagpenger.
    </Normaltekst>
  );
}

function erRegistrert() {
  return (
    <Normaltekst>
      Du er registrert som arbeidssøker. For å fortsette å være registrert må du{" "}
      <Lenke href="https://www.nav.no/meldekort/">sende hvert meldekort</Lenke>{" "}
      innen fristen, også når du venter på svar på søknaden din. Hvis du ikke
      sender meldekort kan du miste rett til dagpenger.
    </Normaltekst>
  );
}

function erIkkeRegistrert() {
  return (
    <Normaltekst>
      Du er ikke registert som arbeidssøker. Du må være registert og{" "}
      <Lenke href="https://www.nav.no/meldekort/">sende hvert meldekort</Lenke>{" "}
      innen fristen, for å ha rett til dagpenger. Dette gjelder også når du
      venter på svar på søknaden din. Hvis du ikke sender meldekort kan du miste
      rett til dagpenger.
    </Normaltekst>
  );
}
