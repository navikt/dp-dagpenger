import useSWR from "swr";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";
import React from "react";
import AlertStripe from "nav-frontend-alertstriper";

export const Registreringsstatus = () => {
  const { data: registrering, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/arbeidssoker/perioder`
  );

  if (registrering === undefined && !error) return null;
  const erRegistrert = registrering.arbeidssokerperioder.length;

  return (
    <div style={{ marginTop: "1rem" }}>
      {error ? (
        <FantIkkeSvaret />
      ) : erRegistrert ? (
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
      Du er ikke registrert som arbeidssøker. Du må være registrert og{" "}
      <Lenke href="https://www.nav.no/meldekort/">sende hvert meldekort</Lenke>{" "}
      innen fristen, for å ha rett til dagpenger. Dette gjelder også når du
      venter på svar på søknaden din. Hvis du ikke sender meldekort kan du miste
      rett til dagpenger.
    </Normaltekst>
  );
}
