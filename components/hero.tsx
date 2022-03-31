import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

import { contentfulImageLoader } from 'contentful/contentfulImageLoader';
import { LinkButton } from './button';
import { NavigationItem } from 'contentful/client';
import heroImage from '../public/hero.jpeg';
import Hamburger from './hamburger/hamburger';
import Menu from './menu';

interface HeroProps {
  image?: {
    url?: string;
  };
  title: string;
  subtext: string;
  buttonText?: string;
  buttonLink?: string;
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
  const [isOpen, setIsOpen] = useState(false);

  const url = image?.url || heroImage;
  const imageLoader = image?.url ? contentfulImageLoader : undefined;

  const handleHamburgerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative flex h-128 w-full flex-col xl:h-160">
        {/* Hero image */}
        <Image
          src={url}
          loader={imageLoader}
          unoptimized={!image?.url}
          priority={true}
          quality={50}
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-[10%] grayscale"
          alt=""
        />

        {/* Navigation */}
        <header className="z-10 mx-auto h-16 w-screen max-w-4xl">
          {/* Desktop navigation bar */}
          <ul className="hidden w-full justify-end md:flex">
            <NavLink href="/" name="Radio" />

            {navigationItems.map(({ name, slug }) => (
              <NavLink key={slug} href={`/${slug}`} name={name} />
            ))}

            <NavLink href="/arkisto" name="Arkisto" />
          </ul>
        </header>

        {/* Hero content */}
        <div className="z-10 flex h-full flex-col items-center justify-center md:flex-row">
          <div className="relative h-52 w-52 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
            <Image
              src="/leima.svg"
              layout="fill"
              priority={true}
              alt="Logo of Turun Wappuradio ry"
              unoptimized={true}
            />
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
      {/* Mobile hamburger menu */}
      <Hamburger
        className="fixed top-0 right-0 z-30 md:hidden"
        isOpen={isOpen}
        onClick={handleHamburgerClick}
      />
      <Menu
        navigationItems={navigationItems}
        isOpen={isOpen}
        closeMenu={handleMenuClose}
      />
    </>
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
