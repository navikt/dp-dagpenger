import { addWeeks, isBefore } from "date-fns";

export function innenfor12Uker(innsendt: string): boolean {
  const innsendtDate = new Date(innsendt);
  const today = new Date();
  const endDate = addWeeks(innsendtDate, 12);
  return isBefore(today, endDate);
}
