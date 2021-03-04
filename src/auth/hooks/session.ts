import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { createContext, createElement, useContext } from "react";

const SessionContext = createContext();

export const Provider = ({ children, session }) => {
  return createElement(
    SessionContext.Provider,
    { value: useSession(session) },
    children
  );
};

// Client side method
export const useSession = (session) => {
  const value = useContext(SessionContext);

  if (value === undefined) {
    return _useSessionHook(session);
  }

  return value;
};

const _useSessionHook = (session) => {
  const { data, isValidating } = useSWR("/api/auth/session", fetcher);
  const user = data && data.user;
  return [user, isValidating];
};

// Server side method (APIs and getServerSideProps)
export async function getSession({ ctx, req = ctx?.req } = {}) {
  const baseUrl = _apiBaseUrl();
  const fetchOptions = req ? { headers: { cookie: req.headers.cookie } } : {};
  const session = await fetcher(
    `${baseUrl}/session`,
    fetchOptions
  ).then((data) => (Object.keys(data).length > 0 ? data : null));
  return session;
}

const _apiBaseUrl = () => `http://localhost:3000/api/auth`;
