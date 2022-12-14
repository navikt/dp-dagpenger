import useSWR from "swr";
import React from "react";
import { Alert, BodyLong } from "@navikt/ds-react";
import Link from "next/link";

export const Registreringsstatus = () => {
  const { data: registrering, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/arbeidssoker/perioder`
  );

  if (registrering === undefined && !error) return null;
  if (error || typeof registrering.arbeidssokerperioder === "undefined") {
    return <FantIkkeSvaret />;
  }

  const erRegistrert = registrering.arbeidssokerperioder.length;

  return (
    <div style={{ marginTop: "1rem" }}>
      {erRegistrert ? (
        <ErRegistrert />
      ) : (
        <Alert variant="warning">
          <ErIkkeRegistrert />
        </Alert>
      )}
    </div>
  );
};

function FantIkkeSvaret() {
  return (
    <BodyLong spacing>
      Du må være{" "}
      <Link href="https://arbeidssokerregistrering.nav.no/start">
        registrert
      </Link>{" "}
      som arbeidssøker og{" "}
      <Link href="https://www.nav.no/meldekort/">sende meldekort</Link> innen
      fristen. Dette gjelder også når du venter på svar på søknaden din.
    </BodyLong>
  );
}

function ErRegistrert() {
  return (
    <BodyLong spacing>
      Du er registrert som arbeidssøker. For å fortsette å være registrert må du{" "}
      <Link href="https://www.nav.no/meldekort/">sende hvert meldekort</Link>{" "}
      innen fristen, også når du venter på svar på søknaden din.
    </BodyLong>
  );
}

function ErIkkeRegistrert() {
  return (
    <BodyLong>
      Du er ikke registrert som arbeidssøker. For å få dagpenger må du{" "}
      <Link href="https://arbeidssokerregistrering.nav.no/start">
        registrere deg
      </Link>{" "}
      og sende meldekort innen fristen. Dette gjelder også når du venter på svar
      på søknaden din.
    </BodyLong>
  );
}
