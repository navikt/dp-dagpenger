import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { AccountNumber } from "../components/account-number/AccountNumber";
import { JournalpostList } from "../components/journalposter/JournalpostList";
import { MeldFraOmEndring } from "../components/meld-fra-om-endring/MeldFraOmEndring";
import { NoSessionModal } from "../components/no-session-modal/NoSessionModal";
import { PageHero } from "../components/page-hero/PageHero";
import { Shortcuts } from "../components/shortcuts/Shortcuts";
import { Soknader } from "../components/soknader/Soknader";
import { useSanity } from "../context/sanity-context";
import { innsynAudience } from "../lib/audience";
import { getSession } from "../lib/auth.utils";
import Metrics from "../lib/metrics";
import { innenfor12Uker } from "../util/soknadDato.util";
import { PaabegyntSoknad, hentPaabegynteSoknader } from "./api/paabegynteSoknader";
import { Søknad, hentSoknader } from "./api/soknader";
import { UxSignalsWidget } from "../components/UxSignalsWidget";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  fullforteSoknader: Søknad[] | null;
  paabegynteSoknader: PaabegyntSoknad[] | null;
  env: IEnv;
}

interface IEnv {
  soknadsdialogIngress: string;
  appEnv;
  uxSignals: {
    enabled: boolean;
    mode: string;
  };
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const session = await getSession(context.req);

  if (process.env.SERVERSIDE_LOGIN === "enabled") {
    if (!session) {
      return {
        redirect: {
          destination: `/api/auth/signin?destination=${encodeURIComponent(context.resolvedUrl)}`,
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
    paabegynteSoknader = (await hentPaabegynteSoknader(onBehalfOfToken)) || null;
  } catch {
    paabegynteSoknader = null;
  }

  if (fullforteSoknader) {
    fullforteSoknader.forEach(({ erNySøknadsdialog, datoInnsendt }) => {
      const generasjon = erNySøknadsdialog ? "ny" : "gammel";
      Metrics.ettersendinger.labels(generasjon, innenfor12Uker(datoInnsendt).toString()).inc();
    });
  }

  return {
    props: {
      fullforteSoknader,
      paabegynteSoknader,
      env: {
        soknadsdialogIngress: process.env.SOKNADSDIALOG_URL,
        appEnv: process.env.APP_ENV,
        uxSignals: {
          enabled: process.env.UXSIGNALS_ENABLED === "enabled",
          mode: process.env.UXSIGNALS_MODE === "demo" ? "demo" : "",
        },
      },
    },
  };
}

export default function Status({ fullforteSoknader, paabegynteSoknader, env }: Props) {
  const { getAppText } = useSanity();
  const router = useRouter();

  useEffect(() => {
    // Task analytic Spørreundersøkelse for gammel og ny vedtaksbrev
    const nyBrev = env.appEnv === "production" ? "03409" : "03400";
    const gammelBrev = env.appEnv === "production" ? "03408" : "03400";

    setTimeout(() => {
      //@ts-ignore Ukjent TA type
      if (router.query && typeof window.TA === "function") {
        if (router.query.brev === "ny") {
          //@ts-ignore Ukjent TA type
          window.TA("start", nyBrev);
        }

        if (router.query.brev === "gammel") {
          //@ts-ignore Ukjent TA type
          window.TA("start", gammelBrev);
        }
      }
    }, 2000);
  });

  return (
    <>
      <Head>
        <title>{getAppText("meta.tittel")}</title>
      </Head>
      <main className="mine-dagpenger-app" id="maincontent" tabIndex={-1}>
        <PageHero hasFullforteSoknader={fullforteSoknader?.length > 0} />
        <UxSignalsWidget enabled={env.uxSignals.enabled} mode={env.uxSignals.mode} />
        <Soknader
          paabegynteSoknader={paabegynteSoknader}
          fullforteSoknader={fullforteSoknader}
          soknadsdialogIngress={env.soknadsdialogIngress}
        />
        <AccountNumber />
        <MeldFraOmEndring />
        <Shortcuts />
        <JournalpostList />
        <NoSessionModal />
      </main>
    </>
  );
}
