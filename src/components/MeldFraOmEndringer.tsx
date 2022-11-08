import { Flatknapp, Knapp } from "nav-frontend-knapper";
import { Normaltekst } from "nav-frontend-typografi";
import { Seksjon } from "./Seksjon";

interface Props {
  toggleVisGenerellInnsending: boolean;
}

export const MeldFraOmEndringer = ({ toggleVisGenerellInnsending }: Props) => {
  function navigerTilEndringslosning() {
    window.location.href = "https://www.nav.no/skriv-til-oss";
  }

  function navigerTilGenerellInnsending() {
    window.location.href = "https://www.nav.no/dagpenger/soknad/innsending";
  }

  return (
    <Seksjon tittel={"Meld fra om endring"}>
      <Normaltekst>
        Det er viktig at du gir oss beskjed hvis situasjonen din endrer seg, for
        eksempel hvis du er tilbake i jobb, er syk eller oppholder deg i
        utlandet. Se{" "}
        <a href="https://www.nav.no/no/nav-og-samfunn/om-nav/relatert-informasjon/du-har-plikt-til-a-gi-nav-riktige-opplysninger">
          hvilke endringer du må gi beskjed om
        </a>
        .
      </Normaltekst>
      <nav className="navigation-container">
        <Knapp onClick={navigerTilEndringslosning}>
          Send melding om endring
        </Knapp>
        {toggleVisGenerellInnsending && (
          <Flatknapp onClick={navigerTilGenerellInnsending}>
            Send inn dokument
          </Flatknapp>
        )}
      </nav>
    </Seksjon>
  );
};
