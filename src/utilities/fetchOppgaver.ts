export enum OppgaveType {
    Vedlegg = "Vedlegg",
    FåVedtak = "Få vedtak",
    SøkeOmDagpenger = "Søke om dagpenger"
}

export enum OppgaveTilstand {
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


export const fetchOppgaver = async (): Promise<ApiOppgave[]> => {
    return fetch("/api/mockoppgaver?manglendeVedlegg")
        .then(res =>
            res.json()
                .then(data => data.oppgaver));
}