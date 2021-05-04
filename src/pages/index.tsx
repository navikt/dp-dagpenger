import Layout from "../components/layout";
import "nav-frontend-knapper-style/dist/main.css";
import "nav-frontend-alertstriper-style/dist/main.css";
import "nav-frontend-typografi-style/dist/main.css";
import "nav-frontend-veilederpanel-style/dist/main.css";
import "nav-frontend-lenkepanel-style/dist/main.css";
import { Seksjon } from "../components/Seksjon";
import { Ikon } from "../components/Ikon";
import { Oppgave } from "../components/oppgaver/Oppgave";
import { MeldekortInfoOppgave } from "../components/oppgaver/MeldekortInfoOppgave";
import { KontonummerInfoOppgave } from "../components/oppgaver/KontonummerInfoOppgave";
import { SaksProsess } from "../components/saksprosess/Saksprosess";
import {
  Innholdstittel,
  Normaltekst,
  Systemtittel,
} from "nav-frontend-typografi";
import { Snarveier } from "../components/Snarveier";
import { DokumentLenkepanel } from "../components/DokumentLenkepanel";
import { ApiOppgave } from "../utilities/fetchOppgaver";
import { useEffect, useState } from "react";
import {
  erManglendeVedleggsOppgave,
  erSoknadMottattOppgave,
  erVedleggsOppgave,
  erVedtakFattet,
} from "../utilities/apiOppgaver";
import useSWR from "swr";

interface ViewModel {
  tittel: string; // Static
  tidspunktSoknadMottatt: string; // Kan hentes fra oppgaveType: "Søke om dagpenger"
  displayVedleggsoppgave: boolean; // Sjekke om det er opppgaver med oppgaveType:"Vedlegg" && tilstand:"Uferdig"
  antallVedleggsOppgaver: number;
  antallManglendeVedleggsOppgaver: number;
  vedleggFrist?: Date; // Mangler i oppgave fra API. Kan det legges til noe på "opprettet"? 14 dager?
  vedtakErFattet: boolean;
}

function generateModel(oppgaver: ApiOppgave[] = []): ViewModel {
  const getSoknadMottatOppgave = (): ApiOppgave => {
    const oppgaveMottatt = oppgaver.filter(erSoknadMottattOppgave);
    return oppgaveMottatt.length ? oppgaveMottatt[0] : null;
  };

  const soknadMottattDate = new Date(getSoknadMottatOppgave().opprettet);

  const model: ViewModel = {
    tittel: "Søknaden er mottatt",
    tidspunktSoknadMottatt: soknadMottattDate.toLocaleString(),
    displayVedleggsoppgave: oppgaver.some(erManglendeVedleggsOppgave),
    antallVedleggsOppgaver: oppgaver.filter(erVedleggsOppgave).length,
    antallManglendeVedleggsOppgaver: oppgaver.filter(erManglendeVedleggsOppgave)
      .length,
    vedtakErFattet: oppgaver.some(erVedtakFattet),
  };

  return model;
}

export default function Home() {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/oppgaver`);
  const [viewModel, setViewModel] = useState({
    tittel: "",
    tidspunktSoknadMottatt: null,
    displayVedleggsoppgave: false,
    antallVedleggsOppgaver: 0,
    antallManglendeVedleggsOppgaver: 0,
    vedtakErFattet: false,
  });

  useEffect(() => {
    if (data) setViewModel(generateModel(data.oppgaver));
  }, [data]);

  const renderVedleggsOppgave = () => {
    if (viewModel.displayVedleggsoppgave) {
      return (
        <Oppgave
          oppgaveTittel={`Vi mangler ${viewModel.antallManglendeVedleggsOppgaver} av ${viewModel.antallVedleggsOppgaver} vedlegg for å kunne behandle søknaden din.
           Du må sende dette inn så fort som mulig, ellers kan søknaden din bli avslått. Last opp vedlegg her.`}
        ></Oppgave>
      );
    }
    return <></>;
  };

  return (
    <Layout>
      <Innholdstittel
        style={{
          display: "block",
          textAlign: "center",
          margin: "34px 0 100px 0",
        }}
      >
        Dine dagpenger
      </Innholdstittel>

      <Seksjon
        tittel={viewModel.tittel}
        undertittel={viewModel.tidspunktSoknadMottatt}
        iconSvg={<Ikon navn="place" />}
      >
        <Normaltekst>
          Vi har fått søknaden din. Saksbehandlingstiden er normalt fire uker,
          men kan bli lenger dersom vi mangler opplysninger eller NAV mottar
          svært mange søknader.
        </Normaltekst>

        <div className="oppgaver">
          <Systemtittel>Dine oppgaver</Systemtittel>
          <div className="oppgave-liste">
            {renderVedleggsOppgave()}
            <MeldekortInfoOppgave />
            <KontonummerInfoOppgave />
          </div>
        </div>
      </Seksjon>

      <Seksjon
        tittel={"Følg søknaden"}
        iconSvg={<Ikon navn="task" />}
        style={{ marginBottom: "50px" }}
      >
        <SaksProsess
          tidspunktSoknadMottatt={viewModel.tidspunktSoknadMottatt}
          antallVedleggsOppgaver={viewModel.antallVedleggsOppgaver}
          antallManglendeVedleggsOppgaver={
            viewModel.antallManglendeVedleggsOppgaver
          }
          vedtakErFattet={viewModel.vedtakErFattet}
        />
      </Seksjon>
      <DokumentLenkepanel></DokumentLenkepanel>
      <Snarveier></Snarveier>
      <style jsx>{`
        .oppgaver {
          margin-top: 2em;
        }
        .oppgave-liste-tittel {
          margin-top: 1em;
        }
        .oppgave-liste {
          margin-top: 26px;
        }
      `}</style>
    </Layout>
  );
}
