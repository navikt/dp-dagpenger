import { ApiOppgave, OppgaveTilstand, OppgaveType } from "./fetchOppgaver";

export const erVedleggsOppgave = (o: ApiOppgave) =>
    o.oppgaveType === OppgaveType.Vedlegg;

export const erVedtaksOppgave = (o: ApiOppgave) =>
    o.oppgaveType === OppgaveType.FåVedtak;

export const erSokeOmDagpengerOppgave = (o: ApiOppgave) =>
    o.oppgaveType === OppgaveType.SøkeOmDagpenger;


export const erFerdig = (o: ApiOppgave) => o.tilstand === OppgaveTilstand.Ferdig;

export const erManglendeVedleggsOppgave = (o: ApiOppgave) => erVedleggsOppgave(o) && !erFerdig(o);
export const erSoknadMottattOppgave = (o: ApiOppgave) => erSokeOmDagpengerOppgave(o) && erFerdig(o);
export const erVedtakFattet = (o: ApiOppgave) => erVedtaksOppgave(o) && erFerdig(o);