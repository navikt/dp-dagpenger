import { addWeeks, isBefore } from "date-fns";

export function innenfor12Uker(innsendt: string): boolean {
  const innsendtDato: Date = new Date(innsendt);
  const iDag: Date = new Date();
  const sluttDato: Date = addWeeks(innsendtDato, 12);
  return isBefore(iDag, sluttDato);
}
