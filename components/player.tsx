import { BsPlay, BsPause, BsVolumeUp, BsVolumeMute } from 'react-icons/bs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import useMetadata from 'hooks/useMetadata';
import { Show } from 'contentful/client';
import { contentfulImageLoader } from 'contentful/contentfulImageLoader';
import testcard from '../public/testcard.webp';
import Controls from './controls';

const SHOW_REFRESH_TIME = 10000; // 10 seconds

interface PlayerProps {
  playing: boolean;
  onPlayPause: () => void;
  muted: boolean;
  onMute: () => void;
  showsByDate: Record<string, Show[]>;
}

const Player = ({
  playing,
  onPlayPause,
  muted,
  onMute,
  showsByDate,
}: PlayerProps) => {
  const show = useCurrentShow(showsByDate);

  const { picture, name } = show ?? {};
  const url = picture?.url || testcard;
  const loader = picture?.url ? contentfulImageLoader : undefined;

  const { song, artist } = useMetadata();

  return (
    <div className="mx-auto rounded-3xl bg-gradient-to-b from-coral to-blue-lightest p-1.5 lg:max-w-4xl">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center rounded-[1.25rem] bg-blue-darkest md:justify-start">
        <div className="relative m-4 aspect-[3/2] w-60 md:w-96">
          <Image
            src={url}
            loader={loader}
            unoptimized={!picture?.url}
            layout="fill"
            alt=""
          />
        </div>
        <div className="m-4 flex flex-col">
          {name && (
            <>
              <span className="text-white">Studiossa nyt</span>
              <span className="text-xl font-bold text-coral">{name}</span>

              <span className="mt-4 text-white">Nyt soi</span>
              <span className="text-xl font-bold text-coral">{song}</span>
              <span className="text-coral">{artist}</span>
            </>
          )}
          <Controls
            playing={playing}
            onPlayPause={onPlayPause}
            muted={muted}
            onMute={onMute}
          />
        </div>
      </div>
    </div>
  );
};

const useCurrentShow = (showsByDate: Record<string, Show[]>) => {
  const [currentShow, setCurrentShow] = useState<Show | null>(null);

  const getCurrentShow = () => {
    const now = new Date('2022-04-23');
    const currentDate = format(now, 'y.M.dd');
    const todaysShows = showsByDate[currentDate];

    if (!todaysShows) {
      setCurrentShow(null);
      return;
    }

    const currentShow: Show | null = todaysShows.find((show) => {
      const startTime = new Date(show.start);
      const endTime = new Date(show.end);

      return now >= startTime && now <= endTime;
    });

    setCurrentShow(currentShow);
  };

  useEffect(() => {
    getCurrentShow();
    const updater = setInterval(getCurrentShow, SHOW_REFRESH_TIME);
    return () => clearInterval(updater);
  }, []);

  return currentShow;
};

export default Player;
