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
    { title: "Min side", url: "https://www.nav.no/person/dittnav" },
    {
      title: "Mine dagpenger",
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

  render(): JSX.Element {
    const { Styles, Scripts, Header, Footer } = this.props;

    return (
      <Html lang="no">
        <Head>
          <Styles />
        </Head>
        <body>
          <Scripts />
          <Header />
          <Main />
          <Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}
