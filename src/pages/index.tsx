import Layout from "../components/layout";
import "nav-frontend-knapper-style/dist/main.css";
import "nav-frontend-alertstriper-style/dist/main.css";
import "nav-frontend-typografi-style/dist/main.css";
import "nav-frontend-veilederpanel-style/dist/main.css";
import "nav-frontend-lenkepanel-style/dist/main.css";
import { Seksjon } from "../components/seksjon";
import { Ikon } from "../components/ikon";
import { Oppgave } from "../components/oppgaver/Oppgave";
import { MeldekortInfoOppgave } from "../components/oppgaver/MeldekortInfoOppgave";
import { SaksProsess } from "../components/saksprosess/saksprosess";
import { Systemtittel, Normaltekst, Innholdstittel } from "nav-frontend-typografi";
import { Snarveier } from "../components/snarveier";
import { DokumentLenkepanel } from "../components/dokumentLenkepanel";

export default function Home() {
  const soknadTimestamp = "12.07.2020 - 15:39";

  return (
    <Layout>
      <Innholdstittel style={{display: 'block', textAlign: 'center', margin: '34px 0 100px 0'}}>Dine dagpenger</Innholdstittel>

      <Seksjon
        tittel={"Søknaden er mottatt"}
        undertittel={soknadTimestamp}
        iconSvg={<Ikon navn="place" />}
      >
        <Normaltekst>
          Vi har fått søknaden din. Nå skal en saksbehandler kontrollere alle
          opplysningene, det skjer normalt innen 14 dager. Hvis all nødvendig
          informasjon er på plass vil du få et svar samme dag.
        </Normaltekst>

        <div className="oppgaver">
          <Systemtittel>Dine oppgaver</Systemtittel>
          <div className="oppgave-liste">
            <Oppgave
              oppgaveTittel={
                "Du må laste opp vedlegg så fort som mulig for at vi skal kunne behandle dagpengesøknaden din. Frist: 20.07.2020"
              }
            ></Oppgave>
            <MeldekortInfoOppgave />
          </div>
        </div>
      </Seksjon>

      <Seksjon
        tittel={"Følg søknaden"}
        iconSvg={<Ikon navn="task" />}
        style={{ marginBottom: "50px" }}
      >
        <SaksProsess />
      </Seksjon>
      <DokumentLenkepanel></DokumentLenkepanel>
      <Snarveier></Snarveier>
      <style jsx>{`
        .oppgaver {
          margin-top: 2em;
        }
        .oppgave-liste-tittel {
          margin-top: 1em;
        }
        .oppgave-liste {
          margin-top: 26px;
        }
      `}</style>
    </Layout>
  );
}
