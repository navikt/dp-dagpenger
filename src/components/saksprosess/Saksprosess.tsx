import Lenke from "nav-frontend-lenker";
import React, { useEffect, useState } from "react";
import { SaksHendelse, SaksTilstand } from "./SaksHendelse";
import styles from "./saksprosess.module.css";

type SaksType =
  | "soknadmottatt"
  | "manglendevedlegg"
  | "allevedleggmottatt"
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
  <Lenke href="#">Les brevet fra NAV</Lenke>
);
const renderVedleggLink = (tittel: string) => <Lenke href="#">{tittel}</Lenke>;

const renderLenkeForSakstype = (sakshendelse: Hendelse) => {
  switch (sakshendelse.sakstype) {
    case "soknadmottatt":
      return renderSeSoknadOgKvittering();
    case "manglendevedlegg":
      return renderVedleggLink("Last opp vedlegg");
    case "allevedleggmottatt":
      return renderVedleggLink("Se vedleggene");
    case "mangelbrev":
      return renderDokumentListeLink();
    case "vedtak":
      return <Lenke href="#">Les vedtaksbrevet</Lenke>;
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
    //TODO: Her må vi sjekke hvovidt det er innvigelse eller avslag og spesifisere dette i tidslinjen, ikke bare vedtak generelt.
    if (props.vedtakErFattet) {
      return {
        sakstype: "vedtak",
        tilstand: "utfort",
        tittel:
          "Søknaden din er ferdigbehandlet og det er fattet et vedtak. For å se vedtaket, følg lenken under",
      };
    }
    return {
      tilstand: "inaktiv",
      tittel: "Når saken din er ferdig behandlet vil du få et varsel på SMS.",
    };
  };

  const venterPåDokumentasjonHendelse = (): Hendelse => {
    return {
      tilstand: "inaktiv",
      tittel: `Når du har sendt inn nødvendig dokumentasjon, vil vi behandle søknaden din så raskt som mulig. Dersom vi mangler noe vil du få beskjed.`,
    };
  };

  const manglendeVedleggsHendelse = (): Hendelse => {
    return {
      sakstype: "manglendevedlegg",
      tilstand: "hendelse",
      tittel: `Vi mangler ${props.antallManglendeVedleggsOppgaver} vedlegg for å kunne behandle søknaden din. Husk at du må sende inn nødvendig dokumentasjon senest 14 dager etter at vi mottok søknaden din. Hvis du ikke rekker fristen, ta kontakt med NAV (nav.no/kontakt)`,
    };
  };

  const fullfortVedleggsHendelse = (): Hendelse => {
    return {
      sakstype: "allevedleggmottatt",
      tilstand: "utfort",
      tittel:
        "Vi har mottatt alle vedleggene du skulle sende inn. Saken din vil bli behandlet så raskt som mulig. Du får beskjed dersom vi trenger mer dokumentasjon",
    };
  };

  const mangelbrevHendelse = (): Hendelse => {
    return {
      sakstype: "mangelbrev",
      tilstand: "hendelse",
      tittel:
        "Du må sende oss flere opplysninger før vi kan behandle søknaden din.",
    };
  };

  const innvigelseHendelse = (): Hendelse => {
    return {
      sakstype: "vedtak",
      tilstand: "utfort",
      tittel:
        "Du har fått innvilget dagpenger. Det er viktig at du leser hele vedtaket og kontrollerer at opplysningene er riktige.",
    };
  };

  const avslagHendelse = (): Hendelse => {
    return {
      sakstype: "vedtak",
      tilstand: "hendelse",
      tittel:
        "Du har fått avslag på søknaden om dagpenger, les vedtaksbrevet for å se hvorfor.",
    };
  };

  const inkluderVedleggsHendelse = () => {
    if (props.antallManglendeVedleggsOppgaver > 0) {
      return manglendeVedleggsHendelse();
    } else if (props.antallManglendeVedleggsOppgaver === 0) {
      return fullfortVedleggsHendelse();
    }
  };

  const generateHendelser = (): Hendelse[] => {
    const h: Hendelse[] = [
      {
        sakstype: "soknadmottatt",
        tilstand: "utfort",
        tittel: "NAV har mottatt din søknad om dagpenger",
        label: props.tidspunktSoknadMottatt,
      },
    ];
    if (props.antallVedleggsOppgaver > 0) {
      h.push(inkluderVedleggsHendelse());
    }
    if (props.antallManglendeVedleggsOppgaver > 0) {
      h.push(venterPåDokumentasjonHendelse());
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
