import Head from "next/head";
import Layout from "../components/layout";
import "nav-frontend-knapper-style/dist/main.css";
import "nav-frontend-alertstriper-style/dist/main.css";
import "nav-frontend-typografi-style/dist/main.css";
import "nav-frontend-veilederpanel-style/dist/main.css";
import "nav-frontend-lenkepanel-style/dist/main.css";
import { Seksjon } from "../components/Seksjon";
import { Ikon } from "../components/Ikon";
import { Innholdstittel } from "nav-frontend-typografi";
import { Snarveier } from "../components/Snarveier";
import { DokumentLenkepanel } from "../components/DokumentLenkepanel";
import { useSession } from "../auth/react/session.hook";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO: Bli enige om vi skal mocke slik, eller om vi skal gå via en metode delt mellom SSR og APIet.
  const søknader = await fetch("http://localhost:3000/api/soknader").then(
    (res) => res.json()
  );

  if (!søknader.length) {
    return {
      props: {},
    };
  }

  const [nyesteSøknad] = søknader;

  return {
    props: {},
    redirect: {
      destination: `/soknader/${nyesteSøknad.id}`,
    },
  };
};

export default function Status(): JSX.Element {
  const { session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>Mine dagpenger</title>
      </Head>
      <main>
        <header>
          <Innholdstittel
            style={{
              display: "block",
              textAlign: "center",
              margin: "34px 0 100px 0",
            }}
          >
            Dine dagpenger
          </Innholdstittel>
        </header>

        <Seksjon tittel="Dine søknader" iconSvg={<Ikon navn="place" />}>
          Du har ingen.
        </Seksjon>
      </main>
      <nav aria-label={"Dokumentliste"}>
        <DokumentLenkepanel></DokumentLenkepanel>
      </nav>
      <nav aria-label={"Snarveier"}>
        <Snarveier></Snarveier>
      </nav>
    </Layout>
  );
}
