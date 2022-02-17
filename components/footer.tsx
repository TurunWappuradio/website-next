import Image from 'next/image';
import Link from 'next/Link';
import { FC } from 'react';

import { NavigationItem } from 'contentful/client';

interface FooterProps {
  navigationItems: NavigationItem[];
}

const Footer: FC<FooterProps> = ({ navigationItems }) => {
  return (
    <div className="z-15 p-6 flex flex-wrap items-center justify-center bg-blue-dark">
      <div className="p-4 px-12 text-l text-white">
        <ul>
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
      <div className="p-4 px-12 text-sm text-white">
        <ul>
          <li>Tähän tulis ne somelinkit</li>
        </ul>
      </div>
      <div className="relative h-40 w-40 lg:h-52 lg:w-52 xl:h-60 xl:w-60">
        <Image src="/leima.svg" layout="fill" priority={true} />
      </div>
    </div>
  );
};

export default Footer;
