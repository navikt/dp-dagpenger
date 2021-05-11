import { Ikon } from "../Ikon";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";

export const KontonummerInfoOppgave = (): JSX.Element => {
  const ikon = <Ikon size="liten" navn="info" bakgrunnFarge="#C1EAF7" />;
  return (
    <div className="info-oppgave">
      {ikon}
      <Normaltekst style={{ marginLeft: "18px" }}>
        Sjekk at du har registrert riktig kontonummer hos NAV.{" "}
        <Lenke href="https://www.nav.no/person/personopplysninger/nb/#adresser">
          <br /> Se ditt kontonummer.
        </Lenke>{" "}
      </Normaltekst>
      <style>{`
      .info-oppgave {
        display: flex;
        align-items: center;
        padding: 1rem;
        background-color: #F5FCFD;
        border: 1px solid #289FC5;
        border-radius: 4px;
        margin-bottom: 1rem;
      }
      `}</style>
    </div>
  );
};
