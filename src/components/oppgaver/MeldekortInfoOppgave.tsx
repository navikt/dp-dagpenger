import useSWR from "swr";
import { Ikon } from "../Ikon";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";
import React from "react";

export const MeldekortInfoOppgave = () => {
  const { data: registrering, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/registrering`,
    (url) =>
      fetch(url).then((r) => {
        if (r.status == 204) return false;
        return r.json();
      })
  );
  const ikon = <Ikon size="liten" navn="info" bakgrunnFarge="#C1EAF7" />;

  return (
    <div className="info-oppgave">
      {ikon}
      {error
        ? fantIkkeSvaret()
        : registrering
        ? erRegistrert()
        : erIkkeRegistrert()}
      <style>{`
      .info-oppgave {
        display: flex;
        align-items: center;
        padding: 1rem;
        background-color: #F5FCFD;
        border: 1px solid #289FC5;
        border-radius: 4px;
      }
      `}</style>
    </div>
  );
};

function fantIkkeSvaret() {
  return (
    <Normaltekst style={{ marginLeft: "18px" }}>
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
    <Normaltekst style={{ marginLeft: "18px" }}>
      Du er registrert som arbeidssøker. For å fortsette å være registrert må du{" "}
      <Lenke href="https://www.nav.no/meldekort/">sende hvert meldekort</Lenke>{" "}
      innen fristen, også når du venter på svar på søknaden din. Hvis du ikke
      sender meldekort kan du miste rett til dagpenger.
    </Normaltekst>
  );
}

function erIkkeRegistrert() {
  return (
    <Normaltekst style={{ marginLeft: "18px" }}>
      Du er ikke registert som arbeissøker. Du må være registert og{" "}
      <Lenke href="https://www.nav.no/meldekort/">sende hvert meldekort</Lenke>{" "}
      innen fristen, for å ha rett til dagpenger. Dette gjelder også når du
      venter på svar på søknaden din. Hvis du ikke sender meldekort kan du miste
      rett til dagpenger.
    </Normaltekst>
  );
}
