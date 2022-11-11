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
          return <p key={soknad.søknadId}>En påbegynt søknad</p>;
        })}
      {fullforteSoknader &&
        fullforteSoknader.map((soknad) => {
          return <p key={soknad.søknadId}>en fullført søknad</p>;
        })}
    </>
  );
};
