import Image from 'next/image';
import Link from 'next/Link';
import { FC } from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';

import { NavigationItem } from 'contentful/client';

interface FooterProps {
  navigationItems: NavigationItem[];
}

const Footer: FC<FooterProps> = ({ navigationItems }) => {
  return (
    <div className="z-15 p-6 flex flex-wrap items-center justify-center bg-blue-dark">
      <div className="p-4 px-12 text-l text-white">
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
              <a className='hover:underline'>Lisätietoja</a>
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
      <div className="p-4 px-12 text-sm text-white">
        <ul>
          <li className="text-center">
            <a href="https://instagram.com" target="_blank" className="flex items-center text-center">
            <AiOutlineInstagram className="h-6 w-6 p-1"/>
            Instagram
            </a>
          </li>
        </ul>
      </div>
      <div>
      <div className="relative flex h-28 w-28 lg:h-32 lg:w-32 xl:h-36 xl:w-36">
        <Image src="/leima.svg" layout="fill" priority={true} />
      </div>
        <div className="relative p-3 text-center text-sm text-white opacity-50">Ja tähän loput</div>
      </div>
      <style jsx>{`
      li:hover {
        text-decoration:underline
      }
      `}</style>
    </div>
  );
};

export default Footer;
