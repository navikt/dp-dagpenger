import useSWR from "swr";
import NavFrontendSpinner from "nav-frontend-spinner";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import "nav-frontend-alertstriper-style/dist/main.css";
import { Normaltekst } from "nav-frontend-typografi";
import { Behandlingsstatus, Status } from "../pages/api/behandlingsstatus";
import React from "react";
import { Seksjon } from "./Seksjon";
import { Ikon } from "./Ikon";
import { Registreringsstatus } from "./Registreringsstatus";
import { Kontonummer } from "./Kontonummer";
import api from "../lib/api";
import Lenke from "nav-frontend-lenker";
import { SoknadOmDagpenger } from "./soknadOmDagpenger/SoknadOmDagpenger";
import { PaabegyntSoknad } from "../pages/api/paabegynteSoknader";

function useBehandlingsstatus() {
  const { data, error } = useSWR<Behandlingsstatus>(api("/behandlingsstatus"));

  return {
    behandlingsstatuser: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function StatusISaken(
  paabegynteSoknader: PaabegyntSoknad[]
): JSX.Element {
  const { behandlingsstatuser, isLoading, isError } = useBehandlingsstatus();

  let soknadOmDagpengerListe;

  // for (let i = 0; i < paabegynteSoknader.length; i++) {
  //   const listeSoknad = {
  //     tittel: paabegynteSoknader[i].tittel,
  //     ikon: "place",
  //     dato: paabegynteSoknader[i].sistEndret,
  //     status: "Påbegynt",
  //     venstreKnappUrl: "URL",
  //     venstreKnapp: "KNAAAAAAP",
  //     hoyreKnapp: "URL",
  //     hoyreKnappUrl: "KNAAAAAAAAPP",
  //   };

  //   return soknadOmDagpengerListe.append(listeSoknad);
  // }

  console.log("paabegynteSoknader", paabegynteSoknader);

  paabegynteSoknader.forEach((soknad) => {
    const listeSoknad = {
      tittel: soknad.tittel,
      ikon: "place",
      dato: soknad.sistEndret,
      status: "Påbegynt",
      venstreKnappUrl: "URL",
      venstreKnapp: "KNAAAAAAP",
      hoyreKnapp: "URL",
      hoyreKnappUrl: "KNAAAAAAAAPP",
    };

    return soknadOmDagpengerListe.append(listeSoknad);
  });

  console.log("soknadOmDagpengerListe", soknadOmDagpengerListe);

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
    <>
      <Seksjon tittel={"Status i saken"} iconSvg={<Ikon navn="place" />}>
        <BehandlingsstatusTekst {...behandlingsstatuser} />
      </Seksjon>
      {soknadOmDagpengerListe?.map((soknadOmDagpenger) => (
        <SoknadOmDagpenger soknadOmDagpenger={soknadOmDagpenger} />
      ))}
    </>
  );
}

const Søknadstekst = ({ antall }: { antall: number }) => (
  <>
    {antall} {antall === 1 ? "søknad" : "søknader"}
  </>
);

function BehandlingsstatusTekst({
  status,
  antallSøknader,
  antallVedtak,
}: Behandlingsstatus) {
  const tekster: Record<Status, JSX.Element> = {
    UnderBehandling: (
      <>
        <Normaltekst>
          Du har {<Søknadstekst antall={antallSøknader} />} under behandling.
          Husk å sende alle vedlegg hvis du manglet noen da du søkte. Vi kan
          ikke behandle søknaden før du har sendt alle vedlegg. Se hvor lang{" "}
          <a href="https://www.nav.no/saksbehandlingstider#dagpenger">
            saksbehandlingstiden
          </a>{" "}
          er på dagpenger nå.
        </Normaltekst>
      </>
    ),
    FerdigBehandlet: (
      <>
        <Normaltekst>
          Du har fått <Lenke href={"#dokumentliste"}>svar på søknaden</Lenke>{" "}
          din.
        </Normaltekst>
      </>
    ),
    UnderOgFerdigBehandlet: (
      <>
        <Normaltekst>
          Du har {<Søknadstekst antall={antallSøknader - antallVedtak} />} under
          behandling og {<Søknadstekst antall={antallVedtak} />} som er ferdig
          behandlet. Husk å sende alle vedlegg hvis du manglet noen da du søkte.
          Vi kan ikke behandle søknaden før du har sendt alle vedlegg. Se hvor
          lang{" "}
          <a href="https://www.nav.no/saksbehandlingstider#dagpenger">
            saksbehandlingstiden
          </a>{" "}
          er på dagpenger nå.
        </Normaltekst>
      </>
    ),
  };

  return (
    <>
      {tekster[status]}
      <Normaltekst style={{ marginTop: "1rem" }}>
        Hvis du får dagpenger, kommer pengene på konto noen få dager etter du
        har sendt meldekortet. I svaret på søknaden vil det stå hvor mye du kan
        få utbetalt.
      </Normaltekst>
      <Kontonummer />
      <Registreringsstatus />
    </>
  );
}
