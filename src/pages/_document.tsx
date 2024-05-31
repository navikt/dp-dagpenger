import React from "react";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import {
  DecoratorComponents,
  DecoratorFetchProps,
  fetchDecoratorReact,
} from "@navikt/nav-dekoratoren-moduler/ssr";

const decoratorEnv: "dev" | "prod" = process.env.NAIS_CLUSTER_NAME === "prod-gcp" ? "prod" : "dev";

const decoratorProps: DecoratorFetchProps = {
  env: decoratorEnv,
  params: {
    context: "privatperson",
    breadcrumbs: [
      { title: "Min side", url: "https://www.nav.no/minside" },
      {
        title: "Mine dagpenger",
        url: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
      },
    ],
  },
};

export default class MyDocument extends Document<DecoratorComponents> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const decorator = await fetchDecoratorReact(decoratorProps);

    return {
      ...initialProps,
      ...decorator,
    };
  }

  render(): JSX.Element {
    const { Styles, Scripts, Header, Footer } = this.props;

    return (
      <Html lang="no">
        <Head />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <Styles />
        <Scripts />
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
