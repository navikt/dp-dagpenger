import { Flatknapp, Knapp } from "nav-frontend-knapper";
import { Undertekst } from "nav-frontend-typografi";
import { Ikon } from "../Ikon";
import { Seksjon } from "../Seksjon";

export const SoknadOmDagpenger = (dato: string) => {
  return (
    <>
      <Seksjon tittel="Søknad om dagpenger" iconSvg={<Ikon navn="info" />}>
        <Undertekst style={{ color: "#6A6A6A" }}>
          Sendt: {/* <time dateTime={dato}>{localeString}</time>- {avsender} */}
        </Undertekst>
        <br />
        <Knapp>Send dokumentasjon</Knapp>
        <Flatknapp>Se søknaden</Flatknapp>
      </Seksjon>
    </>
  );
};
