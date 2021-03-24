import { Ikon } from "./ikon";
import Lenke from "nav-frontend-lenker";

export const MeldekortInfoOppgave = () => {

  const ikon = <Ikon size="liten" navn="info" bakgrunnFarge="#C1EAF7" />;
  return (
    <div className="info-oppgave">
      {ikon}
      <div className="info-text">
      Du må <Lenke href="https://www.nav.no/meldekort/">sende meldekort</Lenke> hver 14. dag, også når du venter på svar på søknaden din. Hvis du ikke sender meldekort kan du bli miste retten til dagpenger.
      </div>
      <style>{`
      .info-oppgave {
        display: flex;
        align-items: center;
        padding: 1rem;
        background-color: #F5FCFD;
        border: 1px solid #289FC5;
        border-radius: 4px;
      }
      .info-oppgave .info-text {
        margin-left: 18px;
      }
      `}</style>
    </div>
  );
};
