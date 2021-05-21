import { ApiSoknad, SoknadsTilstand } from "../utilities/fetchOppgaver";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Element } from "nav-frontend-typografi";
import Panel from "nav-frontend-paneler";
import "nav-frontend-paneler-style/dist/main.css";

interface SoknadsVelgerProps {
  soknader: ApiSoknad[];
  valgtSoknadsId: string;
}

const getTilstandstekst = (tilstand: SoknadsTilstand) => {
  if (tilstand === SoknadsTilstand.Ferdig)
    return "Status: Søknaden er ferdig behandlet";
  return "Status: Søknaden er mottatt ";
};

const getSoknadstidspunkt = (soknadstidspunkt: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  };

  const date = new Date(soknadstidspunkt).toLocaleDateString(
    undefined,
    options
  );
  return `Sendt ${date}`;
};

const mapToLenkeObjekt = (soknad: ApiSoknad) => {
  return {
    id: soknad.id,
    søknadstidspunkt: getSoknadstidspunkt(soknad.søknadstidspunkt),
    tilstandstekst: getTilstandstekst(soknad.tilstand),
  };
};

const mapToPanel = (s: ApiSoknad, erValgtSoknad: boolean) => {
  if (erValgtSoknad) {
    return (
      <Panel
        style={{
          backgroundColor: "white",
          borderTopStyle: "solid",
          borderBottomStyle: "solid",
          borderWidth: "1px",
        }}
      >
        <Element>{`${getSoknadstidspunkt(
          s.søknadstidspunkt
        )} (valgt)`}</Element>
        <p className="tilstand">{getTilstandstekst(s.tilstand)}</p>
      </Panel>
    );
  } else {
    return (
      <LenkepanelBase
        key={s.id}
        href={`/soknader/${s.id}`}
        style={{
          backgroundColor: "#F1F1F1",
          borderBottomStyle: "solid",
          borderBottomColor: "white",
        }}
      >
        <div>
          <Element>{getSoknadstidspunkt(s.søknadstidspunkt)}</Element>
          <p className="tilstand">{getTilstandstekst(s.tilstand)}</p>
        </div>
      </LenkepanelBase>
    );
  }
};

export const SoknadsVelger = (props: SoknadsVelgerProps) => {
  if (props.soknader.length === 1) return null;

  const { soknader } = props;
  const erValgtSoknad = (soknad: { id: string }) => {
    return soknad.id === props.valgtSoknadsId;
  };

  return (
    <Ekspanderbartpanel
      className="soknadsvelger"
      tittel={`Se flere søknader (${soknader.length})`}
      style={{
        borderWidth: "0px",
      }}
    >
      <Element
        className="tittel"
        style={{
          backgroundColor: "#F1F1F1",
          marginBottom: "0px",
        }}
      >
        Du har {soknader.length} dagpengesøknader
      </Element>
      {soknader.map((s) => {
        return mapToPanel(s, erValgtSoknad(s));
      })}
      <style>
        {`.soknadsvelger .ekspanderbartPanel__innhold{
          padding: 0 !important;
          backgroundColor: #F1F1F1;
        }
        .tittel {
          padding: 1rem;
          margin: 0 0 1rem 0;
          font-size: 20px;
        }
        .soknadsvelger .ekspanderbartPanel__innhold .lenkepanel{
          margin-bottom: 0px;
        }
        `}
      </style>
    </Ekspanderbartpanel>
  );
};
