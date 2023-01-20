import { Alert, BodyLong, Button, Heading, Loader } from "@navikt/ds-react";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { NUMBER_OF_DOCUMENT_TO_SHOW_DEFAULT } from "../../constants";
import { useSanity } from "../../context/sanity-context";
import { logg } from "../../lib/amplitude";
import api from "../../lib/api";
import { Journalpost } from "../../pages/api/dokumenter";
import { Icon } from "../Icon";
import { Section } from "../section/Section";
import { SectionContent } from "../section/SectionContent";
import { JournalpostCard } from "./JournalpostCard";
import styles from "./Journalposter.module.css";

function useDokumentListe() {
  const { data, error } = useSWR<Journalpost[]>(api(`/dokumenter`));

  return {
    journalposter: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useTrackingVistDokumentlisten(journalposter: Journalpost[]) {
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

export function JournalpostList() {
  const [visAlle, setVisAlle] = useState(false);
  const { getAppText } = useSanity();
  const { journalposter, isLoading, isError } = useDokumentListe();

  useTrackingVistDokumentlisten(journalposter);

  if (isLoading)
    return (
      <Section>
        <Loader size="2xlarge" title="Laster innhold" />
      </Section>
    );

  if (isError)
    return (
      <Section>
        <Alert variant="error">
          {getAppText("tekst.journalpost.feil-ved-henting-av-dokumenter")}
        </Alert>
      </Section>
    );

  const klikkVisAlle = () => {
    setVisAlle(!visAlle);
    logg.klikketVisAlleDokumenter({ antallDokumenter: journalposter.length });
  };

  const journalposterTilVisning = journalposter.slice(
    0,
    visAlle ? journalposter.length : NUMBER_OF_DOCUMENT_TO_SHOW_DEFAULT
  );

  return (
    <Section iconSvg={<Icon name="copy" />} fullWith>
      <SectionContent>
        <Heading level="2" size="medium">
          {getAppText("tekst.journalpost.seksjonsstittel")}
        </Heading>
        <BodyLong>{getAppText("tekst.journalpost.seksjonsstittel")}</BodyLong>
      </SectionContent>

      {journalposterTilVisning.map((journalpost) => (
        <JournalpostCard key={journalpost.journalpostId} {...journalpost} />
      ))}
      {!visAlle && journalposter.length > NUMBER_OF_DOCUMENT_TO_SHOW_DEFAULT && (
        <div className={styles.visAlleKnapp}>
          <Button variant="secondary" onClick={klikkVisAlle}>
            {getAppText("tekst.journalpost.vis-alle-dokumenter")} (
            {journalposter.length})
          </Button>
        </div>
      )}
    </Section>
  );
}
