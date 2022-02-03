import Document, { Html, Head, Main, NextScript } from 'next/document';

// A custom Document for Next.js to inject Tailwind styles to the body.
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-blue">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;