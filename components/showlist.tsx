import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

import { ShowsCollectionItem } from 'pages/arkisto/[showlistId]';
import ResponsiveShowlist from './responsiveShowlist';
import { useState } from 'react';
import ShowlistMap from './showlistMap';
import { ModeButton } from './button';
import { useViewport } from 'hooks/useViewport';

interface Showlist {
  showsByDate: {
    [key: string]: ShowsCollectionItem[];
  };
  shows: ShowsCollectionItem[];
}

export const Showlist = ({ showsByDate, shows }: Showlist) => {
  const [mode, setMode] = useState<string>('list');

  const { isDesktop } = useViewport();

  return (
    <div className="mx-auto flex max-w-6xl flex-col px-4 py-6">
      <div className="flex w-full">
        <h1 className="mx-6 mt-6 w-auto text-xl font-bold text-coral md:text-3xl">
          Ohjelmistossa
        </h1>
        {isDesktop && (
          <div className="ml-auto mt-auto space-x-2">
            <ModeButton
              text={'Ohjelmalista'}
              isActive={mode === 'list'}
              onClick={() => setMode('list')}
            />
            <ModeButton
              text={'Ohjelmakartta'}
              isActive={mode === 'map'}
              onClick={() => setMode('map')}
            />
          </div>
        )}
      </div>
      {mode === 'list' && <ResponsiveShowlist showsByDate={showsByDate} />}
      {mode === 'map' && <ShowlistMap shows={shows} />}
    </div>
  );
};

export default Showlist;
