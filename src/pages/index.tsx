import { Fareknapp, Hovedknapp, Knapp } from "nav-frontend-knapper";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import Veilederpanel from "nav-frontend-veilederpanel";
import Layout from "../components/layout";
import "nav-frontend-knapper-style/dist/main.css";
import "nav-frontend-alertstriper-style/dist/main.css";
import "nav-frontend-typografi-style/dist/main.css";
import "nav-frontend-veilederpanel-style/dist/main.css";
import Place from '@navikt/ds-icons/svg/Place.svg';

export default function Home() {
  return (
    <Layout>
      <div>
        <AlertStripeFeil>Husk å sende inn vedlegg</AlertStripeFeil>
      </div>

      <h1>Hello</h1>
      <div id="knapp1">
        <Knapp>ifoo</Knapp>
      </div>
      <div>
        <Hovedknapp>Mine dagpengesaker</Hovedknapp>
      </div>

      <div>
        <Fareknapp>Send vedlegg</Fareknapp>
      </div>

      <ul>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
      </ul>

      <Veilederpanel svg={<Place />}>Her veileder vi deg</Veilederpanel>
    
      <div id="var">Fikk du svar på det du lurte på?</div>
    </Layout>
  );
}
