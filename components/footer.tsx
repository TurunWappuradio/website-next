import Image from 'next/image';
import Link from 'next/Link';
import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineMail,
  AiFillGithub,
} from 'react-icons/ai';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';

import { NavigationItem } from 'contentful/client';

interface FooterProps {
  navigationItems: NavigationItem[];
}

const Footer = ({ navigationItems }: FooterProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-center max-w-full text-white z-15 bg-blue-darkest py-14 md:flex-row">
      <div className="flex justify-center max-w-full mx-8 my-4 w-128 md:justify-between">
        <div className="hidden md:block">
          <SiteMap navigationItems={navigationItems} />
        </div>
        <div className="flex flex-col items-center">
          <div className="relative h-36 w-36">
            <Image src="/leima.svg" layout="fill" />
          </div>
          <Link href="/tietosuojaseloste">
            <a className="text-sm text-white opacity-25">
              © Turun Wappuradio ry
              <br />
              Tietosuojaseloste
            </a>
          </Link>
        </div>
      </div>

      <div className="max-w-full mx-8 my-4 w-128">
        <Socials />
      </div>
    </div>
  );
};

const SiteMap = ({ navigationItems }: FooterProps) => (
  <ul>
    <NavLink slug="/" name="Radio" />
    {navigationItems.map((navItem) => (
      <NavLink {...navItem} />
    ))}
  </ul>
);

interface NavLinkProps {
  slug?: string;
  name?: string;
}

const NavLink = ({ slug, name }: NavLinkProps) => (
  <li key={slug} className="my-3">
    <Link href={'/' + slug}>
      <a className="font-bold hover:underline">{name}</a>
    </Link>
  </li>
);

const Socials = () => (
  <ul className="flex flex-row items-center justify-around mx-auto w-80 md:block md:w-full">
    <SomeLink
      text="@turunwappuradio"
      LogoComponent={AiOutlineInstagram}
      href="https://instagram.com/turunwappuradio"
    />
    <SomeLink
      text="@turunwappuradio"
      LogoComponent={AiFillFacebook}
      href="https://facebook.com/turunwappuradio/"
    />
    <SomeLink
      text="Discord-serveri"
      LogoComponent={FaDiscord}
      href="https://discord.gg/CpnVGckP9Z"
    />
    <SomeLink
      text="t.me/turunwappuradio"
      LogoComponent={FaTelegramPlane}
      href="https://t.me/turunwappuradio"
    />
    <SomeLink
      text="toimitus[ät]turunwappuradio.com"
      LogoComponent={AiOutlineMail}
      href="mailto:toimitus@turunwappuradio.com"
    />
    <SomeLink
      text="TurunWappuradio"
      LogoComponent={AiFillGithub}
      href="https://github.com/TurunWappuradio"
    />
  </ul>
);

interface SomeLinkProps {
  text: string;
  href: string;
  LogoComponent: any;
}

const SomeLink = ({ text, href, LogoComponent }: SomeLinkProps) => {
  return (
    <li className="my-3">
      <a
        href={href}
        target="_blank"
        className="flex items-center transition hover:underline"
      >
        <LogoComponent className="w-6 h-6" />
        <span className="hidden ml-3 md:block">{text}</span>
      </a>
    </li>
  );
};

export default Footer;
