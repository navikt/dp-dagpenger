import Head from "next/head";
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
import { GetServerSideProps } from "next";
import { ensureAuth, SessionProps } from "../lib/ensure-auth";
import { useSession } from "@navikt/dp-auth/client";

export const getServerSideProps: GetServerSideProps = ensureAuth({
  enforceLogin: process.env.SERVERSIDE_LOGIN === "enabled",
})();

export default function Status({
  session: initialSession,
}: SessionProps): JSX.Element {
  const { session } = useSession({ initialSession });
  if (!session) return null;

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
