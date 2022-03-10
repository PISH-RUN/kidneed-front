import BaseDocument, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class Document extends BaseDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await BaseDocument.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang="fa" dir="rtl">
        <Head />
        <body dir="rtl">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
