import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { imageLoader } from 'contentful/imageLoader';
import { LinkButton } from './button';
import { NavigationItem } from 'contentful/client';
import heroImage from '../public/hero.jpeg';

interface HeroProps {
  image: {
    url?: string;
  };
  title: string;
  subtext: string;
  buttonText: string;
  buttonLink: string;
  navigationItems: NavigationItem[];
}

const Hero: FC<HeroProps> = ({
  image,
  title,
  subtext,
  buttonText,
  buttonLink,
  navigationItems,
}) => {
  const url = image?.url || heroImage;
  const loader = image?.url ? imageLoader : undefined;

  return (
    <div className="relative flex flex-col w-full h-160">
      {/* Hero image */}
      <Image
        src={url}
        loader={loader}
        priority={true}
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-[10%] grayscale"
        alt=""
      />

      {/* Navigation */}
      <header className="z-10 w-screen h-16 max-w-4xl mx-auto">
        {/* Desktop navigation bar. */}
        <ul className="justify-end hidden w-full md:flex">
          <NavLink href="/" name="Radio" />
          {navigationItems.map(({ name, slug }) => (
            <NavLink key={slug} href={`/${slug}`} name={name} />
          ))}
        </ul>
      </header>

      {/* Hero content */}
      <div className="z-10 flex flex-wrap items-center justify-center h-full">
        <div className="relative h-52 w-52 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
          <Image src="/leima.svg" layout="fill" priority={true} alt="Logo of Turun Wappuradio ry" />
        </div>
        <div className="flex flex-col p-8">
          <h1 className="my-3 text-3xl font-bold text-coral md:text-5xl">
            {title}
          </h1>
          <p className="my-3 text-xl text-white md:text-3xl">{subtext}</p>

          {buttonText && buttonLink ? (
            <LinkButton
              className="my-3 ml-auto text-md md:text-xl"
              href={buttonLink}
            >
              {buttonText}
            </LinkButton>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ href, name }: { href: string; name: string }) => (
  <li className="p-4">
    <Link href={href}>
      <a className="text-xl text-white transition hover:text-coral">{name}</a>
    </Link>
  </li>
);

export default Hero;
