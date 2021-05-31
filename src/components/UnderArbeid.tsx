import Veilederpanel from "nav-frontend-veilederpanel";
import { Ikon } from "./Ikon";
import { Systemtittel, Undertekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";

//TODO: Mangler riktige url'er
export const UnderArbeid = () => {
  const ikon = <Ikon navn="info" size="liten" bakgrunnFarge="#FF9100" />;
  return (
    <div className="underarbeid-wrapper">
      <Veilederpanel svg={ikon} fargetema="advarsel">
        <div className="tittel-container">
          <Systemtittel style={{ marginBottom: "10px" }}>
            Denne siden er under arbeid
          </Systemtittel>
          <Undertekst>
            Dette er en ny versjon av ... det betyr at... Vi setter pris på om
            du tar deg tid til å{" "}
            <Lenke href="riktig url">gi oss tilbakemelding</Lenke> eller
            innspill dersom du har noen
          </Undertekst>
          <Undertekst>
            <Lenke href={"riktig url"}>Gå til gammel versjon</Lenke>
          </Undertekst>
        </div>
      </Veilederpanel>
      <style jsx>{`
        .underarbeid-wrapper {
          display: block;
          margin-top: 50px;
          margin-bottom: 105px;
        }
        .tittel-container {
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
};
