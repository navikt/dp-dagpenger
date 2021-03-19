import { Fareknapp, Hovedknapp, Knapp } from "nav-frontend-knapper";
import Layout from "../components/layout";
import "nav-frontend-knapper-style/dist/main.css";
import "nav-frontend-alertstriper-style/dist/main.css";
import "nav-frontend-typografi-style/dist/main.css";
import "nav-frontend-veilederpanel-style/dist/main.css";
import "nav-frontend-lenkepanel-style/dist/main.css";
import Place from "@navikt/ds-icons/svg/Place.svg";
import Task from "@navikt/ds-icons/svg/Task.svg";
import { Seksjon } from "../components/seksjon";
import { Ikon } from "../components/ikon";
import { Oppgave } from "../components/oppgave";
import { SaksProsess } from "../components/saksprosess/saksprosess";
import { Systemtittel } from "nav-frontend-typografi";
import AlertStripe from 'nav-frontend-alertstriper';
import { ForskuddDagpengerInfo } from "../components/forskuddInfo";

export default function Home() {
  return (
    <Layout>
      <h1 className="page-title">Dine dagpenger</h1>

      <Seksjon tittel={"Søknaden er mottatt"} iconSvg={<Ikon ikonSvg={Place} />}>
        <Systemtittel>Dine oppgaver</Systemtittel>
        <div className="oppgave-liste">
          <Oppgave oppgaveTittel={"Du må laste opp vedlegg så fort som mulig for at vi skal kunne behandle dagpengesøknaden din. Frist: 20.07.2020"}></Oppgave>
        </div>
      </Seksjon>

      <ForskuddDagpengerInfo />

      <Seksjon tittel={"Saksprosessen"} iconSvg={<Ikon ikonSvg={Task} />}>
        <SaksProsess />        
      </Seksjon>
      <style jsx>{`
      .oppgave-liste {
        margin-top: 26px;
      }
      `}</style>
    </Layout>
  );
}
