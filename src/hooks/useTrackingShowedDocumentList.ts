import { useEffect, useRef } from "react";
import { logg } from "../lib/amplitude";
import { Journalpost } from "../pages/api/dokumenter";

export function useTrackingShowedDocumentList(journalposter: Journalpost[]) {
  const isFirstTracking = useRef(true);
  useEffect(() => {
    if (!journalposter) return;
    if (!isFirstTracking.current) return;
    isFirstTracking.current = false;

    const antallDagpenger = journalposter.filter((d) => d.tema == "DAG").length;
    const antallOppfølging = journalposter.filter(
      (d) => d.tema == "OPP"
    ).length;
    const søknader = journalposter.filter((d) => d.tittel?.match(/søknad/i));
    const antallDagerSidenSøknad = søknader.length
      ? antallDagerSiden(new Date(søknader[0].dato))
      : null;

    logg.vistDokumentlisten({
      antallDagpenger,
      antallOppfølging,
      antallSøknader: søknader.length,
      antallDagerSidenSøknad,
    });

    function antallDagerSiden(dato: Date): number {
      return Math.round((Date.now() - +dato) / 1000 / 60 / 60 / 24);
    }
  }, [journalposter]);
}
