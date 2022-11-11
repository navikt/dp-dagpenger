import React from "react";
import { PaabegyntSoknad } from "../pages/api/paabegynteSoknader";
import { Søknad } from "../pages/api/soknader";
import { SoknadOmDagpenger } from "./soknadOmDagpenger/SoknadOmDagpenger";

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
      {paabegynteSoknader &&
        paabegynteSoknader.map((soknad) => {
          const soknadOmDagpengerData = {
            tittel: soknad.tittel,
            ikon: "",
            dato: soknad.sistEndret,
            status: soknad.behandlingsId,
            venstreKnappUrl: "/",
            venstreKnapp: "Påbegynte søknader",
            hoyreKnappUrl: "/",
            hoyreKnapp: "ORD ORD ORD",
          };

          return (
            <SoknadOmDagpenger
              key={soknad.søknadId}
              soknadOmDagpengerData={soknadOmDagpengerData}
            >
              En påbegynt søknad
            </SoknadOmDagpenger>
          );
        })}
      {fullforteSoknader &&
        fullforteSoknader.map((soknad) => {
          return (
            <SoknadOmDagpenger
              key={soknad.søknadId}
              soknadOmDagpengerData={soknadOmDagpengerData}
            >
              en fullført søknad
            </SoknadOmDagpenger>
          );
        })}
    </>
  );
};
