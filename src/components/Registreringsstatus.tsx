import useSWR, { mutate } from "swr";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";
import React, { useState } from "react";
import AlertStripe from "nav-frontend-alertstriper";

const arbeidssøkerURL = `${process.env.NEXT_PUBLIC_BASE_PATH}/api/arbeidssoker/perioder`;
export const Registreringsstatus = () => {
  const [anker, setAnker] = useState(undefined);
  const { data: registrering, error } = useSWR(arbeidssøkerURL);

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
    <div className={"test"}>
      <div className={"mocks"}>
        <button
          onClick={() =>
            mutate(arbeidssøkerURL, { arbeidssokerperioder: [] }, false)
          }
        >
          Ikke registrert
        </button>
        <button
          onClick={() =>
            mutate(arbeidssøkerURL, { arbeidssokerperioder: [true] }, false)
          }
        >
          Registrert
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        {erRegistrert ? (
          <ErRegistrert />
        ) : (
          <AlertStripe type={"advarsel"}>
            <ErIkkeRegistrert />
          </AlertStripe>
        )}
      </div>
      <style jsx>{`
        .mocks {
          display: none;
          position: absolute;
          margin-top: -25px;
          height: 25px;
        }
        .mocks button {
          border: 2px solid #e5989b;
          border-radius: 7px;
          background: #ffcdb2;
          color: #6d6875;
          font-weight: bold;
          margin-right: 0.5em;
          padding: 0 1em;
        }
        .test:hover {
          outline: 25px solid pink;
        }
        .test:hover .mocks {
          display: block;
        }
      `}</style>
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
