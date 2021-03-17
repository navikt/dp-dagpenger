import { Fareknapp, Hovedknapp, Knapp } from "nav-frontend-knapper";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import Veilederpanel from "nav-frontend-veilederpanel";
import Layout from "../components/layout";
import "nav-frontend-knapper-style/dist/main.css";
import "nav-frontend-alertstriper-style/dist/main.css";
import "nav-frontend-typografi-style/dist/main.css";
import "nav-frontend-veilederpanel-style/dist/main.css";
import Place from "@navikt/ds-icons/svg/Place.svg";
import { Seksjon } from "../components/seksjon";
import { Ikon } from "../components/ikon";

export default function Home() {
  return (
    <Layout>
      <h1 className="page-title">Dine dagpenger</h1>

      <Seksjon tittel={"Søknaden er mottatt"} iconSvg={<Ikon ikonSvg={Place}/>}/>
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

    </Layout>
  );
}
