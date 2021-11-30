import Document, { Html, Head, Main, NextScript } from 'next/document'

// A custom Document for Next.js to inject Tailwind styles to the body.
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-gradient-to-b from-blue to-blue-light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;