import useSWR from "swr";
import api from "../lib/api";
import { Journalpost } from "../pages/api/dokumenter";

export function useDocumentList() {
  const { data, error } = useSWR<Journalpost[]>(api(`/dokumenter`));

  return {
    journalposter: data,
    isLoading: !error && !data,
    isError: error,
  };
}
