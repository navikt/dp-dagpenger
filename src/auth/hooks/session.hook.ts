import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { createContext, createElement, useContext } from "react";
import { NextApiRequest } from "next";
import { User } from "../lib/api-helpers";

type Session = {
  user?: User;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const SessionContext = createContext(undefined);

interface ProviderArgs {
  children: JSX.Element;
  session: Session;
}

export const Provider = ({ children, session }: ProviderArgs): JSX.Element =>
  createElement(
    SessionContext.Provider,
    { value: useSession(session) },
    children
  );

// Client side method
export const useSession = (session?: Session): [Session | null, boolean] => {
  const context = useContext(SessionContext);
  if (context) return context;
  return _useSessionHook(session);
};

const _useSessionHook = (session): [Session | null, boolean] => {
  const { data, isValidating } = useSWR(
    `${basePath}/api/auth/session`,
    fetcher,
    {
      initialData: session,
    }
  );
  const user = data && data.user;
  return [user, isValidating];
};

// Server side method (APIs and getServerSideProps)
// @s-ignore
type Context = {
  ctx?: Context;
  req?: NextApiRequest;
};

export async function getSession({
  ctx,
  req = ctx?.req,
}: Context = {}): Promise<Session> {
  const baseUrl = _apiBaseUrl();
  const fetchOptions = req ? { headers: { cookie: req.headers.cookie } } : {};
  const session = await fetcher(
    `${baseUrl}/session`,
    fetchOptions
  ).then((data) => (Object.keys(data).length > 0 ? data : null));
  return session;
}

const _apiBaseUrl = () => `http://localhost:3000/api/auth`;
