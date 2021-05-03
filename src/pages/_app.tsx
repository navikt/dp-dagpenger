import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "../styles/global.css";
import { Provider } from "../auth/hooks/session";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../../mocks");
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
