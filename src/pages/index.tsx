import { Heading } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { AccountNumber } from "../components/account-number/AccountNumber";
import { ArbeidssokerStatus } from "../components/arbeidssoker-status/ArbeidssokerStatus";
import { JournalpostList } from "../components/journalposter/JournalpostList";
import { MeldFraOmEndringer } from "../components/meld-fra-om-endring/MeldFraOmEndringer";
import { NoSessionModal } from "../components/no-session-modal/NoSessionModal";
import { Section } from "../components/section/Section";
import { Shortcuts } from "../components/shortcuts/Shortcuts";
import { Soknader } from "../components/soknader/Soknader";
import { useSanity } from "../context/sanity-context";
import { innsynAudience } from "../lib/audience";
import { getSession } from "../lib/auth.utils";
import Metrics from "../lib/metrics";
import { innenfor12Uker } from "../util/soknadDato.util";
import {
  PaabegyntSoknad,
  hentPaabegynteSoknader,
} from "./api/paabegynteSoknader";
import { Søknad, hentSoknader } from "./api/soknader";
import { SectionContent } from "../components/section/SectionContent";

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
}: Props) {
  const { getRichText, getAppText } = useSanity();

  const seksjonSoknadText = getRichText("soknader");

  return (
    <>
      <Head>
        <title>{getAppText("meta.tittel")}</title>
      </Head>
      <main>
        <Section>
          <SectionContent>
            <header className="main-header">
              <Heading size="xlarge">{getAppText("sidetittel")}</Heading>
            </header>
            <PortableText value={seksjonSoknadText} />
            <ArbeidssokerStatus />
          </SectionContent>
        </Section>
        <Soknader
          paabegynteSoknader={paabegynteSoknader}
          fullforteSoknader={fullforteSoknader}
        />
        <Section>
          <SectionContent>
            <AccountNumber />
            <MeldFraOmEndringer />
          </SectionContent>
        </Section>
        <Shortcuts />
        <JournalpostList />
        <NoSessionModal />
      </main>
    </>
  );
}
