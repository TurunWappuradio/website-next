import { useState } from 'react';

import { useViewport } from '@/hooks/useViewport';
import { Show, ShowsByDate } from '@/scripts/google/showlistHelpers';
import { ModeButton } from './button';
import ResponsiveShowlist from './responsiveShowlist';
import ShowlistMap from './showlistMap';

interface ShowlistProps {
  showsByDate: ShowsByDate;
}

export const Showlist = ({ showsByDate }: ShowlistProps) => {
  const [mode, setMode] = useState<'list' | 'map'>('list');

  const { isDesktop } = useViewport();

  return (
    <div className="mx-auto flex flex-col items-center py-6 pr-[25px] lg:pl-[25px]">
      <div className="flex w-full lg:max-w-[70%] xl:max-w-[57rem]">
        <h1 className="mt-6 w-auto pl-6 text-xl font-bold text-coral md:text-3xl lg:pl-0">
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
      <ShowlistSelector showsByDate={showsByDate} mode={mode} />
    </div>
  );
};

interface ShowlistSelectorProps {
  showsByDate: ShowsByDate;
  mode: 'list' | 'map';
}

const ShowlistSelector = ({ showsByDate, mode }: ShowlistSelectorProps) => {
  const { isDesktop } = useViewport();

  if (!isDesktop) {
    return <ResponsiveShowlist showsByDate={showsByDate} />;
  }

  switch (mode) {
    case 'list':
      return <ResponsiveShowlist showsByDate={showsByDate} />;
    case 'map':
      return <ShowlistMap showsByDate={showsByDate} />;
  }
};

export default Showlist;
