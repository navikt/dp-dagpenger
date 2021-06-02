import Head from "next/head";
import React, { useEffect } from "react";
import { loggStatusSjekk } from "../utilities/amplitude";
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
import DokumentListe from "../components/DokumentListe";

export default function Status(): JSX.Element {
  const { session } = useSession();

  useEffect(() => {
    loggStatusSjekk();
  }, []);

  if (!session) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>Mine dagpenger</title>
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
            Dine dagpenger
          </Innholdstittel>
        </header>
        <Seksjon tittel={"Om saken"} iconSvg={<Ikon navn="place" />}>
          <Normaltekst>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            sapiente doloribus saepe expedita soluta cupiditate eaque, ducimus
            tempore, itaque modi ut animi fugiat corrupti rem, cumque beatae.
            Quidem, illo non.
          </Normaltekst>
        </Seksjon>
        <Seksjon
          tittel={"Alle dokumenter for dagpenger og oppfølging"}
          iconSvg={<Ikon navn="copy" />}
        >
          <DokumentListe />
        </Seksjon>
      </main>
      <nav aria-label={"Snarveier"}>
        <Snarveier />
      </nav>
    </Layout>
  );
}
