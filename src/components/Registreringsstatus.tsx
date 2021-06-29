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

  if (registrering === undefined && !error) return null;

  // MIDLERTIDIG LØSNING TIL VI FÅR LØST  navikt/dagpenger#868
  return (
    <div style={{ marginTop: "1rem" }}>
      <FantIkkeSvaret />
    </div>
  );

  /*  return (
    <div style={{ marginTop: "1rem" }}>
      {error ? (
        <FantIkkeSvaret />
      ) : registrering ? (
        <ErRegistrert />
      ) : (
        <AlertStripe type={"advarsel"}>
          <ErIkkeRegistrert />
        </AlertStripe>
      )}
    </div>
  );*/
};

function FantIkkeSvaret() {
  return (
    <Normaltekst>
      Du må være registrert som arbeidssøker og{" "}
      <Lenke href="https://www.nav.no/meldekort/">sende hvert meldekort</Lenke>{" "}
      innen fristen, for å ha rett til dagpenger. Dette gjelder også når du
      venter på svar på søknaden din. Hvis du ikke sender meldekort kan du miste
      rett til dagpenger.
    </Normaltekst>
  );
}

function ErRegistrert() {
  return (
    <Normaltekst>
      Du er registrert som arbeidssøker. For å fortsette å være registrert må du{" "}
      <Lenke href="https://www.nav.no/meldekort/">sende hvert meldekort</Lenke>{" "}
      innen fristen, også når du venter på svar på søknaden din. Hvis du ikke
      sender meldekort kan du miste rett til dagpenger.
    </Normaltekst>
  );
}

function ErIkkeRegistrert() {
  return (
    <Normaltekst>
      Du er ikke registrert som arbeidssøker. Du må være registert og{" "}
      <Lenke href="https://www.nav.no/meldekort/">sende hvert meldekort</Lenke>{" "}
      innen fristen, for å ha rett til dagpenger. Dette gjelder også når du
      venter på svar på søknaden din. Hvis du ikke sender meldekort kan du miste
      rett til dagpenger.
    </Normaltekst>
  );
}
