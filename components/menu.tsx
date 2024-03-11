import Link from 'next/link';

import { NavigationItem } from '@/contentful/client';

interface MenuProps {
  navigationItems: NavigationItem[];
  isOpen: boolean;
  closeMenu: () => void;
}

const Menu = ({ navigationItems, isOpen, closeMenu }: MenuProps) => (
  <div
    className={`
      fixed left-0 top-0 z-30 h-screen w-full
      transform-gpu bg-blue-darkest
      text-white transition-all md:hidden
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}
  >
    <ul className="px-8 pt-24">
      <li>
        <Link href="/">
          <a className="p-2 text-2xl">Radio</a>
        </Link>
      </li>

      {navigationItems.map(({ name, slug }) => (
        <li key={slug} className="my-5">
          <Link href={`/${slug}`}>
            <a className="p-2 text-2xl" onClick={closeMenu}>
              {name}
            </a>
          </Link>
        </li>
      ))}
      <li>
        <Link href="/arkisto">
          <a className="p-2 text-2xl">Arkisto</a>
        </Link>
      </li>
    </ul>
  </div>
);

export default Menu;
