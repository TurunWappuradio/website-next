import Image from 'next/image';
import Link from 'next/Link';
import { FC } from 'react';
import { AiOutlineInstagram, AiFillFacebook } from 'react-icons/ai';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';

import { NavigationItem } from 'contentful/client';

interface FooterProps {
  navigationItems: NavigationItem[];
}

const Footer: FC<FooterProps> = ({ navigationItems }) => {
  return (
    <div className="z-15 p-6 flex flex-wrap items-center justify-center bg-blue-dark">
      <div className="p-4 px-16 text-l text-white">
        <ul className="space-y-2 ">
          <li key="/">
            <Link href={'/'}>
              <a>Etusivu</a>
            </Link>
          </li>
          {navigationItems.map((navItem) => (
            <li key={navItem.slug}>
              <Link href={'/' + navItem.slug}>
                <a>{navItem.name}</a>
              </Link>
            </li>
          ))}
          {/* Other buttons, placeholders */}
          <li>
            <Link href={'/lisatietoja'}>
              <a>Lisätietoja</a>
            </Link>
          </li>
          <li>
            <Link href={'/yhteistyo'}>
              <a>Yhteistyö</a>
            </Link>
          </li>
          <li>
            <Link href={'/musiikki'}>
              <a>Musiikki</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 px-16 text-sm text-white">
        <ul>
          <SomeLink 
          logo={<AiOutlineInstagram 
          className="h-6 w-6 p-1" />} 
          text="@Turunwappuradio" 
          href="https://instagram.com/"
          />
          <SomeLink 
          logo={<AiFillFacebook className="h-6 w-6 p-1" />} 
          text="Turun wappuradio" 
          href="https://facebook.com/"
          />
          <SomeLink
          logo={<FaDiscord className="h-6 w-6 p-1" />}
          text="Turun wappuradion discord"
          href="https://discorg.gg/"
          />
          <SomeLink
          logo={<FaTelegramPlane className='h-6 w-6 p-1' />}
          text="t.me/turunwappuradio"
          href="https://t.me/turunwappuradio"
          />
        </ul>
      </div>
      <div className="flex-col flex-center items-center justify-center">
      <div className="relative mx-auto h-28 w-28 lg:h-32 lg:w-32 xl:h-36 xl:w-36">
        <Image src="/leima.svg" layout="fill" priority={true} />
      </div>
      <Link href="/tietosuojaseloste">
        <a className="relative p-3 text-center text-sm text-white opacity-25">
        © Turun Wappuradio ry
        </a>
        <a className="relative p-3 text-center text-sm text-white opacity-25">
          Tietoturvaseloste
        </a>
      </Link>
        <ul className="relative p-3 text-center text-sm text-white opacity-25">
          <li>
          <a className="font-thin">© Turun Wappuradio ry</a>
          </li>
          <li>
          <a>Tietoturvaseloste</a>
          </li>
        </ul>
      </div>
      <style jsx>{`
      li:hover {
        text-decoration:underline
      }
      `}</style>
    </div>
  );
};

const SomeLink: FC<{ text: string, href: string, logo: JSX.Element }> = ({ text, href, logo }) => {
  return <li className="text-center">
    <a href={href} target="_blank" className="flex items-center text-center hover:underline">
      {logo}{text}
    </a>
  </li>;
};

export default Footer;
