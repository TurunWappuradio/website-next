import Image from 'next/image';
import Link from 'next/link';
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
    <div className="z-15 flex max-w-full flex-row flex-wrap justify-center bg-blue-darkest py-14 text-white md:flex-row">
      <div className="mx-8 my-4 flex w-128 max-w-full justify-center md:justify-between">
        <div className="hidden md:block">
          <SiteMap navigationItems={navigationItems} />
        </div>
        <div className="flex flex-col items-center">
          <div className="relative h-36 w-36">
            <Image
              src="/leima.svg"
              unoptimized={true}
              layout="fill"
              alt="Logo of Turun Wappuradio ry"
            />
          </div>
          <Link href="/tietosuojaseloste">
            <a className="text-sm text-white opacity-50">
              © Turun Wappuradio ry
              <br />
              Tietosuojaseloste
            </a>
          </Link>
        </div>
      </div>

      <div className="mx-8 my-4 w-128 max-w-full">
        <Socials />
      </div>
    </div>
  );
};

const SiteMap = ({ navigationItems }: FooterProps) => (
  <ul>
    <NavLink slug="" name="Radio" />
    {navigationItems.map((navItem) => (
      <NavLink {...navItem} key={navItem.name} />
    ))}
    <NavLink slug="arkisto" name="Arkisto" />
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
  <ul className="mx-auto flex w-80 flex-row items-center justify-around md:block md:w-full">
    <SomeLink
      text="@turunwappuradio"
      LogoComponent={AiOutlineInstagram}
      href="https://instagram.com/turunwappuradio"
      ariaLabel="Instagram"
    />
    <SomeLink
      text="@turunwappuradio"
      LogoComponent={AiFillFacebook}
      href="https:/facebook.com/turunwappuradio/"
      ariaLabel="Facebook"
    />
    <SomeLink
      text="Discord-serveri"
      LogoComponent={FaDiscord}
      href="https:/discord.gg/CpnVGckP9Z"
      ariaLabel="Discord"
    />
    <SomeLink
      text="t.me/turunwappuradio"
      LogoComponent={FaTelegramPlane}
      href="https:/t.me/turunwappuradio"
      ariaLabel="Telegram"
    />
    <SomeLink
      text="toimitus[ät]turunwappuradio.com"
      LogoComponent={AiOutlineMail}
      href="mailto:toimitus@turunwappuradio.com"
      ariaLabel="Email"
    />
    <SomeLink
      text="TurunWappuradio"
      LogoComponent={AiFillGithub}
      href="https:/github.com/TurunWappuradio"
      ariaLabel="GitHub"
    />
  </ul>
);

interface SomeLinkProps {
  text: string;
  href: string;
  LogoComponent: any;
  ariaLabel: string;
}

const SomeLink = ({ text, href, LogoComponent, ariaLabel }: SomeLinkProps) => {
  return (
    <li className="my-3">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
        className="flex items-center transition hover:underline"
      >
        <LogoComponent className="h-6 w-6" />
        <span className="ml-3 hidden md:block">{text}</span>
      </a>
    </li>
  );
};

export default Footer;
