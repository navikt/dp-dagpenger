import Head from "next/head";
import React from "react";
import Layout from "../components/layout";
import "nav-frontend-knapper-style/dist/main.css";
import "nav-frontend-typografi-style/dist/main.css";
import "nav-frontend-veilederpanel-style/dist/main.css";
import "nav-frontend-lenker-style/dist/main.css";
import { Seksjon } from "../components/Seksjon";
import { Ikon } from "../components/Ikon";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { Snarveier } from "../components/Snarveier";
import { useSession } from "../auth/react/session.hook";
import JournalpostListe from "../components/journalposter/JournalpostListe";
import { TilbakemeldingsBoks } from "../components/TilbakemeldingsBoks";
import StatusISaken from "../components/StatusISaken";
import Notifikasjoner from "../components/Notifikasjoner";
import { EttersendingPanel } from "../components/EttersendingPanel";
import useSWR from "swr";
import api from "../lib/api";
import { Søknad } from "./api/soknader";

function useSoknader() {
  const { data, error } = useSWR<Søknad[]>(api("soknader"), {
    initialData: [],
  });

  return {
    soknader: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function Status(): JSX.Element {
  const { session } = useSession();

  const { soknader, isLoading, isError } = useSoknader();

  if (!session) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>Dagpenger og oppfølging</title>
      </Head>
      <main>
        <header
          style={{
            margin: "35px 0 100px 0",
          }}
        >
          <Innholdstittel
            style={{
              display: "block",
              textAlign: "center",
              margin: "35px 0 75px 0",
            }}
          >
            Dagpenger og oppfølging
          </Innholdstittel>
          <Notifikasjoner />
        </header>

        <StatusISaken />

        <EttersendingPanel soknader={soknader} />

        <Seksjon tittel={"Snarveier"}>
          <nav aria-label={"Snarveier"}>
            <Snarveier />
          </nav>
        </Seksjon>

        <Seksjon
          id={"dokumentliste"}
          tittel={"Alle dokumenter for dagpenger og oppfølging"}
          iconSvg={<Ikon navn="copy" />}
        >
          <Normaltekst style={{ marginBottom: "2.5rem" }}>
            Her finner du alle søknader, vedlegg, vedtak, brev, samtalereferater
            og meldinger om dagpenger og oppfølging.
          </Normaltekst>
          <JournalpostListe />
        </Seksjon>
        <TilbakemeldingsBoks />
      </main>
    </Layout>
  );
}
