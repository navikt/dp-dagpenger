import React from "react";
import { PaabegyntSoknad } from "../pages/api/paabegynteSoknader";
import { Søknad } from "../pages/api/soknader";
import { FullforteSoknader } from "./fullforteSoknader/FullforteSoknader";
import { PaabegynteSoknader } from "./paabegynteSoknader/PaabegynteSoknader";

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
            <PaabegynteSoknader
              key={soknad.søknadId}
              soknadOmDagpengerData={soknadOmDagpengerData}
            >
              En påbegynt søknad
            </PaabegynteSoknader>
          );
        })}
      {fullforteSoknader &&
        fullforteSoknader.map((soknad) => {
          const soknadOmDagpengerData = {
            tittel: soknad.tittel,
            ikon: "",
            dato: soknad.datoInnsendt,
            status: soknad.skjemaKode,
            venstreKnappUrl: "/",
            venstreKnapp: "Fullførte søknader",
            hoyreKnappUrl: "/",
            hoyreKnapp: "ORD ORD ORD",
          };

          return (
            <FullforteSoknader
              key={soknad.søknadId}
              soknadOmDagpengerData={soknadOmDagpengerData}
            >
              en fullført søknad
            </FullforteSoknader>
          );
        })}
    </>
  );
};
