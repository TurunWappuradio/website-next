import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col item-center justify-center h-screen w-screen">
      <Head>
        <title>Turun Wappuradio</title>
        <meta name="description" content="Wappuradioo tält puolt jokkee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl text-center">
        Hello world!
      </h1>
    </div>
  );
}
