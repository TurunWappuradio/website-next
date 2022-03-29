import Document, { Html, Head, Main, NextScript } from 'next/document';

// A custom Document for Next.js to inject Tailwind styles to the body.
class MyDocument extends Document {
  render() {
    return (
      <Html lang="fi">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="bg-blue bg-gradient-to-b from-blue to-blue-light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
