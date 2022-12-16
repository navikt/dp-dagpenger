import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import JournalpostListe from "../components/journalposter/JournalpostListe";
import Notifikasjoner from "../components/Notifikasjoner";
import { Snarveier } from "../components/snarveier/Snarveier";
import { TilbakemeldingsBoks } from "../components/TilbakemeldingsBoks";
import { MeldFraOmEndringer } from "../components/MeldFraOmEndringer";
import { getSession } from "../lib/auth.utils";
import { hentSoknader, Søknad } from "./api/soknader";
import {
  hentPaabegynteSoknader,
  PaabegyntSoknad,
} from "./api/paabegynteSoknader";
import { innsynAudience } from "../lib/audience";
import { Soknader } from "../components/soknader/Soknader";
import Metrics from "../lib/metrics";
import { innenfor12Uker } from "../util/soknadDato.util";
import { Heading } from "@navikt/ds-react";
import { NoSessionModal } from "../components/noSessionModal/NoSessionModal";

interface Props {
  fullforteSoknader: Søknad[] | null;
  paabegynteSoknader: PaabegyntSoknad[] | null;
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

  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    onBehalfOfToken = Promise.resolve("12345");
  } else {
    onBehalfOfToken = session.apiToken(innsynAudience);
  }

  let fullforteSoknader: Søknad[] | null;
  try {
    fullforteSoknader = (await hentSoknader(onBehalfOfToken)) || null;
  } catch {
    fullforteSoknader = null;
  }

  let paabegynteSoknader: PaabegyntSoknad[] | null;
  try {
    paabegynteSoknader =
      (await hentPaabegynteSoknader(onBehalfOfToken)) || null;
  } catch {
    paabegynteSoknader = null;
  }

  if (fullforteSoknader) {
    fullforteSoknader.forEach(({ erNySøknadsdialog, datoInnsendt }) => {
      const generasjon = erNySøknadsdialog ? "ny" : "gammel";
      Metrics.ettersendinger
        .labels(generasjon, innenfor12Uker(datoInnsendt).toString())
        .inc();
    });
  }

  return {
    props: {
      fullforteSoknader,
      paabegynteSoknader,
    },
  };
}

export default function Status({
  fullforteSoknader,
  paabegynteSoknader,
}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Dagpenger og oppfølging</title>
      </Head>
      <main>
        <header className="main-header">
          <Heading size="large">Dagpenger og oppfølging</Heading>
          <Notifikasjoner />
        </header>
        <Soknader
          paabegynteSoknader={paabegynteSoknader}
          fullforteSoknader={fullforteSoknader}
        />

        <MeldFraOmEndringer />

        <Snarveier />

        <JournalpostListe />

        <TilbakemeldingsBoks />
        <NoSessionModal />
      </main>
    </>
  );
}
