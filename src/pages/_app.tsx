import React from "react";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "../styles/global.css";
import { Provider } from "../auth/hooks/session.hook";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

/**
 * Accessibility tool - outputs to devtools console on dev only and client-side only.
 * @see https://github.com/dequelabs/react-axe
 */
if (process.env.NODE_ENV !== "production" && !(typeof window === "undefined")) {
  const ReactDOM = require("react-dom");
  const axe = require("react-axe");
  axe(React, ReactDOM, 1000);
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url, options) => fetch(url, options).then((r) => r.json()),
      }}
    >
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  );
}
