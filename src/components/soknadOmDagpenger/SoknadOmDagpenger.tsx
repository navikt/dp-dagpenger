import { Flatknapp, Knapp } from "nav-frontend-knapper";
import { Undertekst } from "nav-frontend-typografi";
import { Ikon } from "../Ikon";
import { Seksjon } from "../Seksjon";

type SoknadOmDagpenger = {
  tittel: string;
  ikon: string;
  dato: Date;
  status: string;
  venstreKnappUrl: string;
  venstreKnapp: string;
  hoyreKnapp: string;
  hoyreKnappUrl: string;
};

export const SoknadOmDagpenger = (
  soknadOmDagpengerData: SoknadOmDagpenger
): JSX.Element => {
  if (!soknadOmDagpengerData) return null;

  const {
    tittel,
    ikon,
    dato,
    status,
    venstreKnappUrl,
    venstreKnapp,
    hoyreKnapp,
    hoyreKnappUrl,
  } = soknadOmDagpengerData;

  function trykkVenstreKnapp() {
    window.location.href = venstreKnappUrl;
  }

  function trykkHoyreKnapp() {
    window.location.href = hoyreKnappUrl;
  }

  return (
    <>
      <Seksjon
        tittel={tittel}
        style={{
          marginTop: "0",
        }}
      >
        {/* <Ikon navn={ikon} /> */}
        <Undertekst style={{ color: "#6A6A6A" }}>Sendt: {dato}</Undertekst>
        <Undertekst>{status}</Undertekst>
        <br />
        <Knapp onClick={trykkVenstreKnapp}>{venstreKnapp}</Knapp>
        <Flatknapp onClick={trykkHoyreKnapp}>{hoyreKnapp}</Flatknapp>
      </Seksjon>
    </>
  );
};
