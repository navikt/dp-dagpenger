import { ApiSoknad, SoknadsTilstand } from "../utilities/fetchOppgaver";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Element } from "nav-frontend-typografi";
import Panel from "nav-frontend-paneler";
import "nav-frontend-paneler-style/dist/main.css";
import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";

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

const mapToPanel = (s: ApiSoknad) => {
  return (
    <Panel
      style={{
        backgroundColor: "#F1F1F1",
      }}
    >
      <Element>{`${getSoknadstidspunkt(s.søknadstidspunkt)} (valgt)`}</Element>
      <p className="tilstand">{getTilstandstekst(s.tilstand)}</p>
    </Panel>
  );
};

const mapToLenkepanelBase = (s: ApiSoknad) => {
  return (
    <Link href={`/soknader/${s.id}`} passHref>
      <LenkepanelBase
        key={s.id}
        style={{
          backgroundColor: "white",
          borderBottomStyle: "solid",
          borderBottomColor: "#F1F1F1",
        }}
        href={`/soknader/${s.id}`}
      >
        <div>
          <Element>{getSoknadstidspunkt(s.søknadstidspunkt)}</Element>
          <p className="tilstand">{getTilstandstekst(s.tilstand)}</p>
        </div>
      </LenkepanelBase>
    </Link>
  );
};

const mapToSoknadsvelgerKomponent = (
  soknad: ApiSoknad,
  erValgtSoknad: boolean
) => {
  if (erValgtSoknad) {
    return mapToPanel(soknad);
  } else {
    return mapToLenkepanelBase(soknad);
  }
};

export const SoknadsVelger = (props: SoknadsVelgerProps) => {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/soknader/`);
  const soknader = data;
  const [apen, setApen] = useState(false);

  if (!data || data.length === 1) return null;

  const erValgtSoknad = (soknad: { id: string }) => {
    return soknad.id === props.valgtSoknadsId;
  };

  const lukkSøknadsMeny = () => {
    setApen(false);
  };

  return (
    <Ekspanderbartpanel
      apen={apen}
      className="soknadsvelger"
      tittel={`Se flere søknader (${soknader.length})`}
      style={{
        borderWidth: "0px",
      }}
    >
      <Element
        className="tittel"
        style={{
          backgroundColor: "white",
          marginBottom: "0px",
          borderBottomStyle: "solid",
          borderBottomColor: "#F1F1F1",
        }}
      >
        Du har {soknader.length} dagpengesøknader
      </Element>
      {soknader.map((s) => {
        return mapToSoknadsvelgerKomponent(s, erValgtSoknad(s));
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
        .soknadsvelger .ekspanderbartPanel__innhold .lenkepanel{
          margin-bottom: 0px;
        }
        `}
      </style>
    </Ekspanderbartpanel>
  );
};
