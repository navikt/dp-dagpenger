import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export function useUser() {
  const { data } = useSWR("/api/auth/session", fetcher);
  const user = data && data.user;
  return [user];
}
