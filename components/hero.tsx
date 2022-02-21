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
    <div className="relative flex h-160 w-full flex-col">
      {/* Hero image */}
      <Image
        src={url}
        loader={loader}
        priority={true}
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-[10%] grayscale"
      />

      {/* Navigation */}
      <header className="z-10 mx-auto h-16 w-screen max-w-4xl">
        {/* Desktop navigation bar. */}
        <ul className="hidden w-full justify-end md:flex">
          <NavLink href="/" name="Radio" />
          {navigationItems.map(({ name, slug }) => (
            <NavLink key={slug} href={`/${slug}`} name={name} />
          ))}
        </ul>
      </header>

      {/* Hero content */}
      <div className="z-10 flex h-full flex-wrap items-center justify-center">
        <div className="relative h-52 w-52 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
          <Image src="/leima.svg" layout="fill" priority={true} />
        </div>
        <div className="flex flex-col p-8">
          <h1 className="my-3 text-3xl font-bold text-coral md:text-5xl">
            {title}
          </h1>
          <p className="my-3 text-xl text-white md:text-3xl">{subtext}</p>

          {buttonText && buttonLink ? (
            <LinkButton
              className="text-md my-3 ml-auto md:text-xl"
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
