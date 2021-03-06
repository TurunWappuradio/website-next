import Image from 'next/image';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { Show } from 'contentful/client';
import { contentfulImageLoader } from 'contentful/contentfulImageLoader';
import testcard from '../public/testcard.webp';
import placeholderImage from '../public/kuva_puuttuu_v2.jpeg';
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

  const { picture, name, hosts } = show ?? {};
  const url = name ? picture?.url ?? placeholderImage : testcard;

  const loader = picture?.url ? contentfulImageLoader : undefined;

  return (
    <div className="flex justify-center p-6">
      <div className="flex w-[21rem] max-w-[59rem] flex-wrap items-center rounded bg-blue-darkest md:w-full md:flex-nowrap md:justify-start">
        <div className="rounded bg-gradient-to-t from-coral via-blue-lightest to-teal p-1.5">
          <div className="relative aspect-[3/2] w-80 rounded md:w-[28rem] lg:w-128">
            <Image
              src={url}
              loader={loader}
              objectFit="cover"
              unoptimized={!picture?.url}
              layout="fill"
              alt=""
            />
          </div>
        </div>
        <div className="mx-6 flex flex-col justify-between py-4 text-white md:mx-10 md:h-full md:py-10">
          {name && (
            <div className="flex flex-col">
              <span className="text-teal">Ohjelmassa nyt</span>
              <span className="text-lg font-bold">{name}</span>
              <span className="opacity-80">
                Juontaa: {hosts ?? 'Haamujuontaja'}
              </span>
            </div>
          )}
          <div className="mt-4">
            <Controls
              playing={playing}
              onPlayPause={onPlayPause}
              muted={muted}
              onMute={onMute}
              showChatAndVideo
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const useCurrentShow = (showsByDate: Record<string, Show[]>) => {
  const [currentShow, setCurrentShow] = useState<Show | null>(null);

  const getCurrentShow = () => {
    const now = new Date();
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
