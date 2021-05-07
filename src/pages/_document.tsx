import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import {
  fetchDecoratorReact,
  Props as DecoratorProps,
  Components as DecoratorComponents,
  ENV,
} from "@navikt/nav-dekoratoren-moduler/ssr";

const dekoratorEnv = process.env.DEKORATOR_ENV as Exclude<ENV, "localhost">;

const dekoratorProps: DecoratorProps = {
  env: dekoratorEnv ?? "prod",
  breadcrumbs: [
    { title: "Ditt NAV", url: "https://www.nav.no/person/dittnav" },
    {
      title: "Dine dagpenger",
      url: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
    },
  ],
  context: "privatperson",
};

export default class MyDocument extends Document<DecoratorComponents> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const Dekorator = await fetchDecoratorReact(dekoratorProps);

    return {
      ...initialProps,
      ...Dekorator,
    };
  }

  render() {
    const { Styles, Scripts, Header, Footer } = this.props;

    return (
      <Html>
        <Head /> {/* Head må først inn, så kan neste blokk inserte elementer */}
        <Head>
          <title>Dine dagpenger</title>
          <meta property="og:title" content="Dine dagpenger" key="title" />
          <Styles />
          <Scripts />
        </Head>
        <body>
          <Header />
          <Main />
          <Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}
