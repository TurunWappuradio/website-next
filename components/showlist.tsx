import { useState } from 'react';

import { Show } from 'contentful/client';
import ResponsiveShowlist from './responsiveShowlist';
import ShowlistMap from './showlistMap';
import { ModeButton } from './button';
import { useViewport } from 'hooks/useViewport';

interface Showlist {
  showsByDate: {
    [key: string]: Show[];
  };
  shows: Show[];
}

export const Showlist = ({ showsByDate, shows }: Showlist) => {
  const [mode, setMode] = useState<string>('list');

  const { isDesktop } = useViewport();

  return (
    <div className="mx-auto flex flex-col items-center py-6">
      <div className="flex w-full max-w-6xl">
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
