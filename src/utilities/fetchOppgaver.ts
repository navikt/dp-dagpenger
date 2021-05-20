export enum OppgaveType {
  Vedlegg = "Vedlegg",
  FåVedtak = "Få vedtak",
  SøkeOmDagpenger = "Søke om dagpenger",
}

export enum OppgaveTilstand {
  Ferdig = "Ferdig",
  Uferdig = "Uferdig",
}

export enum SoknadsTilstand {
  Ferdig = "Ferdig",
  Uferdig = "Uferdig",
}

export interface ApiOppgave {
  id: string;
  behandlingskjedeId: string;
  beskrivelse: string;
  opprettet: string;
  oppgaveType: OppgaveType;
  tilstand: OppgaveTilstand;
}

export interface ApiSoknad {
  id: string;
  tilstand: SoknadsTilstand;
  søknadstidspunkt: string;
  oppgaver: ApiOppgave[];
}
