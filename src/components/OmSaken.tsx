import useSWR from "swr";
import NavFrontendSpinner from "nav-frontend-spinner";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import "nav-frontend-alertstriper-style/dist/main.css";
import { Normaltekst } from "nav-frontend-typografi";
import { Behandlingsstatus, Status } from "../pages/api/behandlingsstatus";
import React from "react";
import { Seksjon } from "./Seksjon";
import { Ikon } from "./Ikon";

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

  if (behandlingsstatuser.status === null) return null;

  return (
    <Seksjon tittel={"Status i saken"} iconSvg={<Ikon navn="place" />}>
      <BehandlingsstatusTekst {...behandlingsstatuser} />
    </Seksjon>
  );
}

function BehandlingsstatusTekst({
  status,
  antallSøknader,
  antallVedtak,
}: Behandlingsstatus) {
  const ingenSoknadMenVedtak = antallSøknader === 0 && antallVedtak > 0;

  const Søknadstekst = ({ antall }: { antall: number }) => (
    <>
      {antall} {antall === 1 ? "søknad" : "søknader"}
    </>
  );

  if (ingenSoknadMenVedtak)
    return <Normaltekst>Du har fått svar på søknaden din.</Normaltekst>;

  const tekster: Record<Status, JSX.Element> = {
    UnderBehandling: (
      <Normaltekst>
        Du har {<Søknadstekst antall={antallSøknader} />} under behandling. For
        at vi skal kunne behandle søknaden din er det viktig at du sender inn
        alle relevante vedlegg. Saksbehandlingstiden for søknader om dagpenger
        er på rundt 4 uker.
      </Normaltekst>
    ),
    FerdigBehandlet: (
      <Normaltekst>
        Du har {<Søknadstekst antall={antallSøknader} />} som er ferdig
        behandlet.
      </Normaltekst>
    ),
    UnderOgFerdigBehandlet: (
      <Normaltekst>
        Du har {<Søknadstekst antall={antallSøknader - antallVedtak} />} under
        behandling og {<Søknadstekst antall={antallVedtak} />} som er ferdig
        behandlet. For at vi skal kunne behandle søknaden din er det viktig at
        du sender inn alle relevante vedlegg. Saksbehandlingstiden for søknader
        om dagpenger er på rundt 4 uker.
      </Normaltekst>
    ),
  };

  return tekster[status];
}
