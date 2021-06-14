import useSWR from "swr";
import NavFrontendSpinner from "nav-frontend-spinner";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import "nav-frontend-alertstriper-style/dist/main.css";
import { Normaltekst } from "nav-frontend-typografi";
import { Behandlingsstatus } from "../pages/api/behandlingsstatus";
import React from "react";

function useBehandlingsstatus() {
  const { data, error } = useSWR<Behandlingsstatus>(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/behandlingsstatus`
  );

  return {
    behandlingsstatuser: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function OmSaken(): JSX.Element {
  const { behandlingsstatuser, isLoading, isError } = useBehandlingsstatus();

  if (isLoading)
    return (
      <NavFrontendSpinner
        role="progressbar"
        aria-live="polite"
        aria-busy="true"
      />
    );
  if (isError)
    return (
      <AlertStripeFeil role="alert">
        Det er ikke mulig å hente informasjon om dine søknader akkurat nå,
        vennligst prøv igjen senere.
      </AlertStripeFeil>
    );

  return <BehandlingsstatusTekst {...behandlingsstatuser} />;
}

function BehandlingsstatusTekst({
  status,
  antallSøknader,
  antallVedtak,
}: Behandlingsstatus) {
  if (status === "UnderBehandling") {
    return (
      <Normaltekst>
        Du har {antallSøknader} søknader under behandling. For at vi skal kunne
        behandle søknaden din er det viktig at du sender inn alle relevante
        vedlegg. Saksbehandlingstiden for søknader om dagpenger er på rundt 4
        uker.
      </Normaltekst>
    );
  } else if (status === "FerdigBehandlet") {
    return (
      <Normaltekst>
        Du har {antallSøknader} søknader som er ferdig behandlet.
      </Normaltekst>
    );
  } else if (status === "UnderOgFerdigBehandlet") {
    return (
      <Normaltekst>
        Du har {antallSøknader - antallVedtak} søknader under behandling og{" "}
        {antallVedtak} søknader som er ferdig behandlet. For at vi skal kunne
        behandle søknaden din er det viktig at du sender inn alle relevante
        vedlegg. Saksbehandlingstiden for søknader om dagpenger er på rundt 4
        uker.
      </Normaltekst>
    );
  }
  return (
    <Normaltekst>
      Saksbehandlingstiden for søknader om dagpenger er på rundt 4 uker.
    </Normaltekst>
  );
}
