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

interface Props {
  paabegynteSoknader: PaabegyntSoknad[];
  fullforteSoknader: Søknad[];
}

export const Soknader = ({
  paabegynteSoknader,
  fullforteSoknader,
}: Props): JSX.Element => {
  if (paabegynteSoknader.length === 0 && fullforteSoknader.length === 0) {
    return null;
  }

  return (
    <Seksjon tittel={"Søknader"} iconSvg={<Ikon navn="place" />}>
      <Normaltekst>
        <p>
          Husk å sende alle vedlegg hvis du manglet noen da du søkte. Vi kan
          ikke behandle søknaden før du har sendt alle vedlegg. Se hvor lang{" "}
          <a href="https://www.nav.no/saksbehandlingstider#dagpenger">
            saksbehandlingstiden
          </a>{" "}
          for dagpenger er nå.
        </p>
        Hvis du får dagpenger, kommer pengene på konto noen få dager etter at du
        har sendt meldekortet. I svaret på søknaden vil det stå hvor mye du kan
        få utbetalt.
      </Normaltekst>

      <Kontonummer />
      <Registreringsstatus />

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
