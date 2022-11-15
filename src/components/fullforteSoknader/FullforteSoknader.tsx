import { Flatknapp, Knapp } from "nav-frontend-knapper";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import { Søknad } from "../../pages/api/soknader";
import { Seksjon } from "../Seksjon";

export const FullforteSoknader = (props: Søknad): JSX.Element => {
  const { tittel, datoInnsendt: dato } = props;

  function trykkVenstreKnapp() {
    // TODO: denne fikser vi sammen :)
  }

  function trykkHoyreKnapp() {
    // TODO: denne fikser vi sammen :)
  }

  return (
    <li>
      <div>
        {/* <Ikon navn={ikon} /> */}
        <Undertittel>{tittel}</Undertittel>
        <Undertekst style={{ color: "#6A6A6A" }}>Sendt: {dato}</Undertekst>
        <Undertekst>{status}</Undertekst>
        <br />
        <Knapp onClick={trykkVenstreKnapp}>En tekst her</Knapp>
        <Flatknapp onClick={trykkHoyreKnapp}>En annen tekst her</Flatknapp>
      </div>
    </li>
  );
};
