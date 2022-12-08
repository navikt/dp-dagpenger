import React from "react";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import { Søknad } from "../../pages/api/soknader";
import { innenfor12Uker } from "../../util/soknadDato.util";
import { FullforteSoknader } from "./FullforteSoknader";
import { Ikon } from "../Ikon";
import { PaabegynteSoknader } from "./PaabegynteSoknader";
import { Seksjon } from "../Seksjon";
import styles from "./Soknader.module.css";
import { Normaltekst } from "nav-frontend-typografi";
import { Kontonummer } from "../Kontonummer";
import { Registreringsstatus } from "../Registreringsstatus";
import AlertStripe from "nav-frontend-alertstriper";

interface Props {
  paabegynteSoknader?: PaabegyntSoknad[] | null;
  fullforteSoknader: Søknad[] | null;
}

export const Soknader = ({
  paabegynteSoknader,
  fullforteSoknader,
}: Props): JSX.Element => {
  if (paabegynteSoknader?.length === 0 && fullforteSoknader?.length === 0) {
    return null;
  }

  const harGammelPaastartetSoknad =
    paabegynteSoknader &&
    paabegynteSoknader.filter((soknad) => !soknad.erNySøknadsdialog).length > 0;

  return (
    <Seksjon tittel={"Søknader"} iconSvg={<Ikon navn="place" />}>
      {harGammelPaastartetSoknad && (
        <AlertStripe type="advarsel" className={styles.feilmelding}>
          Du har en påbegynt søknad om dagpenger, som snart vil bli slettet på
          grunn av oppdateringer i systemene våre. Hvis du ikke vil miste
          søknaden må du fullføre den innen 14. desember 2022, ellers må du
          starte en ny. Du finner dine påbegynte søknader i oversikten over
          søknader under, velg «Fortsett søknaden» for å fullføre og sende inn.
        </AlertStripe>
      )}
      <Normaltekst className={styles.beskrivelse}>
        Husk å sende alle vedlegg hvis du manglet noen da du søkte. Vi kan ikke
        behandle søknaden før du har sendt alle vedlegg. Se hvor lang{" "}
        <a href="https://www.nav.no/saksbehandlingstider#dagpenger">
          saksbehandlingstiden
        </a>{" "}
        for dagpenger er nå.
      </Normaltekst>
      <Normaltekst className={styles.beskrivelse}>
        Hvis du får dagpenger, kommer pengene på konto noen få dager etter at du
        har sendt meldekortet. I svaret på søknaden vil det stå hvor mye du kan
        få utbetalt.
      </Normaltekst>

      <Kontonummer />
      <Registreringsstatus />

      {paabegynteSoknader === null && (
        <AlertStripe type="feil" className={styles.feilmelding}>
          Vi klarte dessverre ikke å hente ut påbegynte søknader. Prøv igjen
          senere.
        </AlertStripe>
      )}

      {fullforteSoknader === null && (
        <AlertStripe type="feil" className={styles.feilmelding}>
          Vi klarte dessverre ikke å hente ut fullførte søknader. Prøv igjen
          senere.
        </AlertStripe>
      )}

      {paabegynteSoknader && (
        <ul className={styles.soknader}>
          {paabegynteSoknader.map((soknad) => (
            <PaabegynteSoknader key={soknad.søknadId} {...soknad} />
          ))}
        </ul>
      )}

      {fullforteSoknader && (
        <ul className={styles.soknader}>
          {fullforteSoknader.map((soknad) => {
            if (innenfor12Uker(soknad.datoInnsendt)) {
              return <FullforteSoknader key={soknad.søknadId} {...soknad} />;
            }
          })}
        </ul>
      )}
    </Seksjon>
  );
};
