import Lenke from "nav-frontend-lenker";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { Element, Normaltekst } from "nav-frontend-typografi";

//TODO: Mangler riktige url'er
export const UnderArbeid = () => {
  return (
    <AlertStripeInfo>
      <b>
        <Element>Denne siden er under arbeid</Element>
      </b>
      <br />
      <Normaltekst>
        Dette er en ny side som skal gi deg innsikt i din sak. Denne skal
        utvikles videre, derfor setter vi pris på om du tar deg tid til å{" "}
        <Lenke href="riktig url">gi oss en tilbakemelding</Lenke> dersom du har
        det.
        <br />
        <br />
        <Lenke href={"riktig url"}>
          Trykk her for å gå til gammel versjon.
        </Lenke>
      </Normaltekst>
    </AlertStripeInfo>
  );
};
