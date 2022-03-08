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
import JournalpostListe from "../components/journalposter/JournalpostListe";
import { TilbakemeldingsBoks } from "../components/TilbakemeldingsBoks";
import StatusISaken from "../components/StatusISaken";
import Notifikasjoner from "../components/Notifikasjoner";
import { EttersendingPanel } from "../components/EttersendingPanel";
import { useSession } from "@navikt/dp-auth/client";
import { GetServerSideProps } from "next";
import { getSession } from "@navikt/dp-auth/server";

/*export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, payload } = await getSession(ctx);

  if (!token) {
    return {
      redirect: {
        destination: `/api/auth/signin?destination=${encodeURIComponent(
          ctx.resolvedUrl
        )}`,
        permanent: false,
      },
    };
  }

  const expires_in = Math.round(payload.exp - Date.now() / 1000);
  return {
    props: { session: { expires_in } },
  };
};*/

export default function Status({ session: initialSession }): JSX.Element {
  /*const { session } = useSession({ initialSession });

  if (!session) {
    return null;
  }*/

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

        <EttersendingPanel />

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
