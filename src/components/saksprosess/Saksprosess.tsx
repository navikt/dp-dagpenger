import Lenke from "nav-frontend-lenker";
import React, { useEffect, useState } from "react";
import { SaksHendelse, SaksTilstand } from "./SaksHendelse";
import styles from "./saksprosess.module.css";

type SaksType =
  | "soknadmottatt"
  | "manglendevedlegg"
  | "behandlingstartet"
  | "mangelbrev"
  | "vedtak";

interface Hendelse {
  sakstype?: SaksType;
  tilstand: SaksTilstand;
  tittel: string;
  label?: string;
}

interface SaksprosessProps {
  tidspunktSoknadMottatt: string;
  antallVedleggsOppgaver: number;
  antallManglendeVedleggsOppgaver: number;
  vedtakErFattet: boolean;
}

const renderSeSoknadOgKvittering = () => (
  <Lenke href="#">Se søknaden og kvittering</Lenke>
);
const renderDokumentListeLink = () => (
  <Lenke href="#">Gå til dokumentliste</Lenke>
);
const renderLastOppVedleggLink = () => (
  <Lenke href="#">Last opp vedlegg</Lenke>
);

const renderLenkeForSakstype = (sakshendelse: Hendelse) => {
  switch (sakshendelse.sakstype) {
    case "soknadmottatt":
      return renderSeSoknadOgKvittering();
    case "manglendevedlegg":
      return renderLastOppVedleggLink();
    case "mangelbrev":
      return renderDokumentListeLink();
    case "vedtak":
      return <Lenke href="#">Se vedtak</Lenke>
    default:
      return null;
  }
};

const renderedSaksHendelse = (s: Hendelse, index) => (
  <SaksHendelse
    id={index}
    tilstand={s.tilstand}
    tittel={s.tittel}
    label={s.label}
  >
    {renderLenkeForSakstype(s)}
  </SaksHendelse>
);

export const SaksProsess = (props: SaksprosessProps) => {
  const [hendelser, setHendelser] = useState([]);

  useEffect(() => {
    setHendelser(generateHendelser());
  }, [props.antallVedleggsOppgaver]);

  const sisteHendelse = (): Hendelse => {
    if(props.vedtakErFattet) {
      return {
        sakstype: "vedtak",
        tilstand: "utfort", 
        tittel: "Søknaden din er ferdigbehandlet og det er fattet et vedtak. For å se vedtaket, følg lenken under"
      }
    }
    return { tilstand: "inaktiv", tittel: "Når saken din er ferdig behandlet vil du få et varsel på SMS." }
  }

  const manglendeVedleggsHendelse = (): Hendelse => {
    return {
      sakstype: "manglendevedlegg",
      tilstand: "hendelse",
      tittel: `Vi mangler ${props.antallManglendeVedleggsOppgaver} av ${props.antallVedleggsOppgaver} vedlegg for å kunne behandle søknaden din`,
    };
  };

  const fullfortVedleggsHendelse = (): Hendelse => {
    return {
      tilstand: "utfort",
      tittel: "Du har sendt inn alle påkrevde vedlegg."
    }
  }
  
  const inkluderVedleggsHendelse = () => {
    if(props.antallManglendeVedleggsOppgaver > 0) {
      return manglendeVedleggsHendelse();
    } else if (props.antallManglendeVedleggsOppgaver === 0) {
      return fullfortVedleggsHendelse();
    }

  }

  const generateHendelser = (): Hendelse[] => {
    const h: Hendelse[] = [
      {
        sakstype: "soknadmottatt",
        tilstand: "utfort",
        tittel: "NAV har mottatt din søknad om dagpenger",
        label: props.tidspunktSoknadMottatt,
      },
    ];
    if(props.antallVedleggsOppgaver > 0) {
      h.push(inkluderVedleggsHendelse())
    }
    h.push(sisteHendelse());
    return h;
  };

  return (
    <ol
      className={styles.saksprosess}
      style={{ listStyle: "none !important", paddingLeft: "0 !important" }}
    >
      {hendelser.map(renderedSaksHendelse)}
    </ol>
  );
};
