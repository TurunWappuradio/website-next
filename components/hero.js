import Image from 'next/image';

import { imageLoader } from 'utils/contentful';
import Button from './button';

function Hero({ image }) {
  const { url } = image;

  return (
    <div className="relative flex flex-col w-screen h-128 xl:h-192">
      {/* Hero image */}
      <Image
        src={url}
        loader={imageLoader}
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-30"
        />

      {/* Navigation */}
      <header className="z-10 w-screen h-16 max-w-4xl mx-auto">
        <ul className="hidden w-full md:flex justify-end">
          {['Radio', 'Lisätietoja', 'Liity mukaan', 'Yhteistyö', 'Musiikki', 'Arkisto'].map(text => (
            <NavLink text={text} key={text} />
          ))}
        </ul>
      </header>

      {/* Hero content */}
      <div className="z-10 flex flex-wrap items-center justify-center h-full">
        <div className="relative h-52 w-52 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
          <Image src="/leima.svg" layout="fill" />
        </div>
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-coral md:text-5xl">
            Turun Wappuradio
          </h1>
          <p className="p-4 text-xl text-white md:text-3xl">
            Ohjelmahaku aukeaa 13.1.
          </p>
          <Button className="text-md md:text-xl">
            Hae ohjelmantekijäksi
          </Button>
        </div>
      </div>
    </div>
  );
}

function NavLink({ text }) {
  return (
    <li className="p-4 text-xl text-white">
      {text}
    </li>
  );
}

export default Hero;