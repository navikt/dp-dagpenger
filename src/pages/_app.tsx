import React, { useEffect } from "react";
import App, { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "../styles/global.css";
import ModalWrapper from "nav-frontend-modal";
import NotifikasjonProvider from "../lib/NotifikasjonProvider";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../__mocks__");
}

/**
 * Accessibility tool - outputs to devtools console on dev only and client-side only.
 * @see https://github.com/dequelabs/react-axe
 */
if (process.env.NODE_ENV !== "production" && !(typeof window === "undefined")) {
  const ReactDOM = require("react-dom");
  const axe = require("@axe-core/react");
  //axe(React, ReactDOM, 1000);
}
export const fetcher = (url, options) =>
  fetch(url, options).then((r) => r.json());

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    const root = document.getElementById("__next");
    ModalWrapper.setAppElement(root);
  }, []);

  return (
    <SWRConfig value={{ fetcher }}>
      <NotifikasjonProvider>
        <Component {...pageProps} />
      </NotifikasjonProvider>
    </SWRConfig>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
