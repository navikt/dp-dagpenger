import { AppProps } from "next/app";
import "../styles/global.css";
import { Provider } from "../auth/hooks/session.hook";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
