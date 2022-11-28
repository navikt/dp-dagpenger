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
import { currentCluster, isToggleEnabled } from "../lib/unleash";
import { MeldFraOmEndringer } from "../components/MeldFraOmEndringer";
import { getSession } from "../lib/auth.utils";
import { hentSoknader, Søknad } from "./api/soknader";
import {
  hentPaabegynteSoknader,
  PaabegyntSoknad,
} from "./api/paabegynteSoknader";
import { innsynAudience } from "../lib/audience";

interface Props {
  erNySoknadAapen: boolean;
  skalViseGenerellInnsending: boolean;
  fullforteSoknader: Søknad[];
  paabegynteSoknader: PaabegyntSoknad[];
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const session = await getSession(context.req);

  if (process.env.SERVERSIDE_LOGIN === "enabled") {
    if (!session) {
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

  let onBehalfOfToken;

  if (process.env.NEXT_PUBLIC_LOCALHOST) {
    onBehalfOfToken = Promise.resolve("12345");
  } else {
    onBehalfOfToken = session.apiToken(innsynAudience);
  }

  const fullforteSoknader: Søknad[] =
    (await hentSoknader(onBehalfOfToken)) || null;
  const paabegynteSoknader: PaabegyntSoknad[] =
    (await hentPaabegynteSoknader(onBehalfOfToken)) || null;

  const erNySoknadAapen = isToggleEnabled(
    `dagpenger.ny-soknadsdialog-innsyn-ny-soknad-er-aapen-${currentCluster}`
  );

  const skalViseGenerellInnsending = isToggleEnabled(
    `dagpenger.ny-soknadsdialog-innsyn-vis-generell-innsending-${currentCluster}`
  );

  return {
    props: {
      erNySoknadAapen,
      skalViseGenerellInnsending,
      fullforteSoknader,
      paabegynteSoknader,
    },
  };
}

export default function Status({
  erNySoknadAapen,
  skalViseGenerellInnsending,
  fullforteSoknader,
  paabegynteSoknader,
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
        <StatusISaken
          paabegynteSoknader={paabegynteSoknader}
          fullforteSoknader={fullforteSoknader}
        />
        <EttersendingPanel />
        <MeldFraOmEndringer
          skalViseGenerellInnsending={skalViseGenerellInnsending}
        />
        <Seksjon tittel={"Snarveier"}>
          <nav aria-label={"Snarveier"}>
            <Snarveier erNySoknadAapen={erNySoknadAapen} />
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
