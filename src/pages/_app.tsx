import { Alert, Heading, Modal } from "@navikt/ds-react";
import NextApp, { AppContext, AppProps } from "next/app";
import { useEffect } from "react";
import { SWRConfig } from "swr";
import SanityProvider from "../context/sanity-context";
import { innsynSanityClient } from "../sanity/sanity-client";
import "../styles/global.css";
import { allTextsQuery } from "../sanity/sanity-queries";
import { ISanity } from "../types/sanity.types";
import "./_app.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../__mocks__");
}

export function fetcher(url: RequestInfo, options: RequestInit = {}) {
  return fetch(url, options).then((r) => r.json());
}

type AppPropsSanityTexts = AppProps & {
  sanityTexts: ISanity;
};

export default function App({
  Component,
  pageProps,
  sanityTexts,
}: AppPropsSanityTexts) {
  useEffect(() => {
    const root = document.getElementById("__next");
    Modal.setAppElement(root);
  }, []);

  if (!sanityTexts) {
    return (
      <Alert variant="error">
        <Heading spacing size="small" level="3">
          Det har skjedd en teknisk feil
        </Heading>
        Beklager, vi mistet kontakten med systemene våre.
      </Alert>
    );
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <SanityProvider initialState={sanityTexts}>
        <div className="dp-dagpenger-app">
          <Component {...pageProps} />
        </div>
      </SanityProvider>
    </SWRConfig>
  );
}

App.getInitialProps = async (context: AppContext) => {
  const { locale, defaultLocale } = context.router;

  if (!locale && !defaultLocale) {
    // Unngår at "alle" feil framstår som manglende locale
    return NextApp.getInitialProps(context);
  }

  const appProps = await NextApp.getInitialProps(context);
  const sanityTexts = await innsynSanityClient.fetch(allTextsQuery, {
    baseLang: "nb",
    lang: locale,
  });

  return { ...appProps, sanityTexts };
};
