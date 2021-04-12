import Lenke from "nav-frontend-lenker";
import React from "react";
import { SaksHendelse } from "./SaksHendelse";
import styles from "./saksprosess.module.css";

type SaksType =
  | "soknadmottatt"
  | "manglendevedlegg"
  | "behandlingstartet"
  | "mangelbrev";

interface SaksHendelse {
  sakstype?: SaksType;
  tilstand: any;
  tittel: string;
  label?: string;
}

interface SaksprosessProps {
  tidspunktSoknadMottatt: string;
  antallVedleggsOppgaver: number;
  antallManglendeVedleggsOppgaver: number;
}

export const SaksProsess = (props: SaksprosessProps) => {
  const renderSeSoknadOgKvittering = () => (
    <Lenke href="#">Se søknaden og kvittering</Lenke>
  );
  const renderDokumentListeLink = () => (
    <Lenke href="#">Gå til dokumentliste</Lenke>
  );
  const renderLastOppVedleggLink = () => (
    <Lenke href="#">Last opp vedlegg</Lenke>
  );

  const renderLenkeForSakstype = (sakshendelse: SaksHendelse) => {
    switch (sakshendelse.sakstype) {
      case "soknadmottatt":
        return renderSeSoknadOgKvittering();
      case "manglendevedlegg":
        return renderLastOppVedleggLink();
      case "mangelbrev":
        return renderDokumentListeLink();
      default:
        return null;
    }
  };

  const inkluderManglendeVedleggsHendelse = (): SaksHendelse => {
    return {
      sakstype: "manglendevedlegg",
      tilstand: "hendelse",
      tittel: `Vi mangler ${props.antallManglendeVedleggsOppgaver} av ${props.antallVedleggsOppgaver} vedlegg for å kunne behandle søknaden din`,
    };
  };

  const hendelserr: SaksHendelse[] = [
    {
      sakstype: "behandlingstartet",
      tilstand: "paagaaende",
      tittel:
        "Vi har begynt å behandle på søknaden din. Dersom vi mangler noe vil du få beskjed.",
    },
    {
      sakstype: "mangelbrev",
      tilstand: "hendelse",
      tittel: "Du har fått et mangelbrev",
      label: "Varsel sendt 13.07.2020 - 12:00",
    },
    {
      tilstand: "inaktiv",
      tittel:
        "Når saken din er ferdig behandlet vil du få et varsel på SMS. Du vil få et svar innen 20. juli 2020",
    },
  ];

  const hendelser = (): SaksHendelse[] => {
    const h: SaksHendelse[] = [
      {
        sakstype: "soknadmottatt",
        tilstand: "utfort",
        tittel: "NAV har mottatt din søknad om dagpenger",
        label: props.tidspunktSoknadMottatt,
      },
    ];
    if (props.antallManglendeVedleggsOppgaver > 0) {
      h.push(inkluderManglendeVedleggsHendelse());
    }
    h.push(...hendelserr);
    return h;
  };

  return (
    <ol
      className={styles.saksprosess}
      style={{ listStyle: "none !important", paddingLeft: "0 !important" }}
    >
      {hendelser().map((hendelse, i) => (
        <SaksHendelse
          id={i}
          tilstand={hendelse.tilstand}
          tittel={hendelse.tittel}
          label={hendelse.label}
        >
          {renderLenkeForSakstype(hendelse)}
        </SaksHendelse>
      ))}
    </ol>
  );
};
