import Image from 'next/image';
import Link from 'next/Link';
import { FC } from 'react';
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
    <div className="z-15 flex max-w-full justify-center items-center bg-blue-darkest py-6">
      <div className="text-l w-128 text-white hidden md:block">
        <ul className="space-y-2">
          <li key="/">
            <Link href={'/'}>
              <a className="hover:underline">Etusivu</a>
            </Link>
          </li>
          {navigationItems.map((navItem) => (
            <li key={navItem.slug}>
              <Link href={'/' + navItem.slug}>
                <a className="hover:underline">{navItem.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-128 justify-end text-sm text-white m-10">
        <ul className="space-y-2">
          <SomeLink
            LogoComponent={AiOutlineInstagram}
            href="https://instagram.com/turunwappuradio"
          />
          <SomeLink
            LogoComponent={
              AiFillFacebook
            }
            href="https://facebook.com/turunwappuradio/"
          />
          <SomeLink
            LogoComponent={
              FaDiscord
            }
            href="https://discord.gg/CpnVGckP9Z"
          />
          <SomeLink
            LogoComponent={
              FaTelegramPlane
            }
            href="https://t.me/turunwappuradio"
          />
          <SomeLink
            LogoComponent={
              AiOutlineMail
            }
            href="mailto:toimitus@turunwappuradio.com"
          />
          <SomeLink
            LogoComponent={
              AiFillGithub
            }
            href="https://github.com/TurunWappuradio"
          />
        </ul>
      <div className="mx-6 flex max-w-full flex-col items-center">
        <div className="relative mx-auto h-28 w-28 lg:h-32 lg:w-32 xl:h-36 xl:w-36">
          <Image src="/leima.svg" layout="fill" priority={true} />
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
    </div>
  );
};

const SomeLink: FC<{ href: string; LogoComponent: any }> = ({ href, LogoComponent }) => {
  return (
    <li className="text-center">
      <a
        href={href}
        target="_blank"
        className="flex items-center transition hover:scale-150"
      >
        <LogoComponent className="h-8 w-8 p-1 transition hover:fill-coral" />
      </a>
    </li>
  );
};

export default Footer;
