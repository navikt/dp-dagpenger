import { Flatknapp, Knapp } from "nav-frontend-knapper";
import { Undertekst } from "nav-frontend-typografi";
import { Ikon } from "../Ikon";
import { Seksjon } from "../Seksjon";

export const SoknadOmDagpenger = (dato: string) => {
  function gaTilSendDokumentasjon() {
    window.location.href = "";
  }

  function gaTilSeSoknad() {
    window.location.href = "";
  }

  return (
    <>
      <Seksjon tittel="Søknad om dagpenger">
        <div style={{ display: "flex" }}>
          <Ikon navn="info" />

          <Undertekst style={{ color: "#6A6A6A" }}>
            Sendt:{" "}
            {/* <time dateTime={dato}>{localeString}</time>- {avsender} */}
          </Undertekst>
          <br />
          <Knapp onClick={gaTilSendDokumentasjon}>Send dokumentasjon</Knapp>
          <Flatknapp onClick={gaTilSeSoknad}>Se søknaden</Flatknapp>
        </div>
      </Seksjon>
    </>
  );
};
