import { ApiSoknad, SoknadsTilstand } from "../utilities/fetchOppgaver";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Element } from "nav-frontend-typografi";

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

export const SoknadsVelger = (props: SoknadsVelgerProps) => {
  const { soknader } = props;
  const erValgtSoknad = (soknad: { id: string }) => {
    return soknad.id === props.valgtSoknadsId;
  };
  return (
    <Ekspanderbartpanel
      className="soknadsvelger"
      tittel={`Se flere søknader (${soknader.length})`}
    >
      <Element className="tittel">
        Du har {soknader.length} dagpengesøknader
      </Element>
      {soknader.map(mapToLenkeObjekt).map((s) => {
        return (
          <LenkepanelBase key={s.id} href={`/soknader/${s.id}`}>
            <div>
              <Element>
                {s.søknadstidspunkt}
                {erValgtSoknad(s) ? " (valgt)" : ""}
              </Element>
              <p className="tilstand">{s.tilstandstekst}</p>
            </div>
          </LenkepanelBase>
        );
      })}
      <style>
        {`.soknadsvelger .ekspanderbartPanel__innhold{
          padding: 0 !important;
        }
        .tittel {
          padding: 1rem;
          margin: 0 0 1rem 0;
          font-size: 20px;
        }
        `}
      </style>
    </Ekspanderbartpanel>
  );
};
