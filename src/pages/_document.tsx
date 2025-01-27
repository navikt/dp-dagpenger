import React from "react";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import {
  DecoratorComponentsReact,
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

export default class MyDocument extends Document<DecoratorComponentsReact> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const decorator = await fetchDecoratorReact(decoratorProps);

    return {
      ...initialProps,
      ...decorator,
    };
  }

  render(): JSX.Element {
    const { HeadAssets, Scripts, Header, Footer } = this.props;

    return (
      <Html lang="no">
        <Head />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-16x16.png`}
        />
        <link
          rel="shortcut icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon.ico`}
        />
        <HeadAssets />
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
