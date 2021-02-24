import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import fetchDekoratorReact, {
  DekoratorReactComponents,
} from "../dekoratøren/fetchDekoratorReact";

export default class MyDocument extends Document<DekoratorReactComponents> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const dekoratøren = await fetchDekoratorReact({
      breadcrumbs: [
        { title: "Forside", url: "https://www.nav.no/arbeid" },
        { title: "Underside", url: "https://www.nav.no" },
      ],
      context: "privatperson",
    });
    return {
      ...initialProps,
      ...dekoratøren,
    };
  }

  render() {
    const {
      DekoratorStyles,
      DekoratorScripts,
      DekoratorHeader,
      DekoratorFooter,
    } = this.props;

    return (
      <Html>
        <Head /> {/* Head må først inn, så kan neste blokk inserte elementer */}
        <Head>
          <DekoratorStyles />
          <DekoratorScripts />
        </Head>
        <body>
          <DekoratorHeader />
          <Main />
          <DekoratorFooter />
          <NextScript />
        </body>
      </Html>
    );
  }
}
