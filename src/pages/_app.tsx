import React, { useEffect } from "react";
import App, { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "../styles/global.css";
import ModalWrapper from "nav-frontend-modal";
import NotifikasjonProvider from "../lib/NotifikasjonProvider";
import "./_app.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../__mocks__");
}

export function fetcher(url: RequestInfo, options: RequestInit = {}) {
  return fetch(url, options).then((r) => r.json());
}

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    const root = document.getElementById("__next");
    ModalWrapper.setAppElement(root);
  }, []);

  return (
    <SWRConfig value={{ fetcher }}>
      <NotifikasjonProvider>
        <div className="dp-dagpenger-app">
          <Component {...pageProps} />
        </div>
      </NotifikasjonProvider>
    </SWRConfig>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
