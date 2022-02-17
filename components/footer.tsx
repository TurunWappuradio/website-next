import Image from 'next/image';
import Link from 'next/Link';
import { FC } from 'react';
<<<<<<< HEAD
import { AiOutlineInstagram } from 'react-icons/ai';
=======
>>>>>>> 322da02cec6383b1c94c3b1c992f9f9a03059950

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
<<<<<<< HEAD
          <li>
            <AiOutlineInstagram /> Tähän tulis ne somelinkit
          </li>
        </ul>
      </div>
      <div className="relative h-32 w-32 lg:h-40 lg:w-40 xl:h-44 xl:w-44">
        <Image src="/leima.svg" layout="fill" priority={true} />
        <div className="p-5 py-12 text-sm text-white opacity-50">Ja tähän loput</div>
=======
          <li>Tähän tulis ne somelinkit</li>
        </ul>
      </div>
      <div className="relative h-40 w-40 lg:h-52 lg:w-52 xl:h-60 xl:w-60">
        <Image src="/leima.svg" layout="fill" priority={true} />
>>>>>>> 322da02cec6383b1c94c3b1c992f9f9a03059950
      </div>
    </div>
  );
};

export default Footer;
