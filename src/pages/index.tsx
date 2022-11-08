import "nav-frontend-knapper-style/dist/main.css";
import "nav-frontend-lenker-style/dist/main.css";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import "nav-frontend-typografi-style/dist/main.css";
import "nav-frontend-veilederpanel-style/dist/main.css";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { EttersendingPanel } from "../components/EttersendingPanel";
import { Ikon } from "../components/Ikon";
import JournalpostListe from "../components/journalposter/JournalpostListe";
import Layout from "../components/layout";
import Notifikasjoner from "../components/Notifikasjoner";
import { Seksjon } from "../components/Seksjon";
import { Snarveier } from "../components/Snarveier";
import StatusISaken from "../components/StatusISaken";
import { TilbakemeldingsBoks } from "../components/TilbakemeldingsBoks";
import { currentCluster, isEnabled } from "../lib/unleash";
import { getSession } from "@navikt/dp-auth/server";
import { MeldFraOmEndringer } from "../components/MeldFraOmEndringer";

interface Props {
  toggleNySoknadErApen: boolean;
  toggleVisGenerellInnsending: boolean;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  if (process.env.SERVERSIDE_LOGIN === "enabled") {
    const { token } = await getSession(context);
    if (!token) {
      return {
        redirect: {
          destination: `/api/auth/signin?destination=${encodeURIComponent(
            context.resolvedUrl
          )}`,
          permanent: false,
        },
      };
    }
  }

  const toggleNySoknadErApen = isEnabled(
    `dagpenger.ny-soknadsdialog-innsyn-ny-soknad-er-aapen-${currentCluster}`
  );

  const toggleVisGenerellInnsending = isEnabled(
    `dagpenger.ny-soknadsdialog-innsyn-vis-generell-innsending-${currentCluster}`
  );

  return {
    props: {
      toggleNySoknadErApen,
      toggleVisGenerellInnsending,
    },
  };
}

export default function Status({
  toggleNySoknadErApen,
  toggleVisGenerellInnsending,
}: Props): JSX.Element {
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
        <MeldFraOmEndringer
          toggleVisGenerellInnsending={toggleVisGenerellInnsending}
        />
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
