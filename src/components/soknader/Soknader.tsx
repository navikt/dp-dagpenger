import React from "react";
import { PaabegyntSoknad } from "../../pages/api/paabegynteSoknader";
import { Søknad } from "../../pages/api/soknader";
import { FullforteSoknader } from "../fullforteSoknader/FullforteSoknader";
import { PaabegynteSoknader } from "../paabegynteSoknader/PaabegynteSoknader";
import styles from "./Soknader.module.css";

interface Props {
  paabegynteSoknader: PaabegyntSoknad[];
  fullforteSoknader: Søknad[];
}

export const Soknader = ({
  paabegynteSoknader,
  fullforteSoknader,
}: Props): JSX.Element => {
  return (
    <>
      {paabegynteSoknader && (
        <ul className={styles.soknader}>
          {paabegynteSoknader.map((soknad) => (
            <PaabegynteSoknader key={soknad.søknadId} {...soknad} />
          ))}
        </ul>
      )}

      {fullforteSoknader && (
        <ul className={styles.soknader}>
          {fullforteSoknader.map((soknad) => (
            <FullforteSoknader key={soknad.søknadId} {...soknad} />
          ))}
        </ul>
      )}
    </>
  );
};
