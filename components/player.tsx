import { useEffect, useState } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { FaTelegramPlane } from 'react-icons/fa';
import { FiMessageSquare, FiPause, FiPlay, FiVideo } from 'react-icons/fi';
import Image from 'next/image';
import { format } from 'date-fns';

import useShoutBoxAndVideo from '@/hooks/useShoutboxAndVideo';
import { Show } from '@/scripts/google/showlistHelpers';
import placeholderImage from '../public/kuva_puuttuu_v2.jpeg';
import testcard from '../public/testcard.webp';

const SHOW_REFRESH_TIME = 10000; // 10 seconds

interface PlayerProps {
  playing: boolean;
  onPlayPause: () => void;
  muted: boolean;
  onMute: () => void;
  showsByDate: Record<string, Show[]>;
}

const Player = ({ playing, onPlayPause, showsByDate }: PlayerProps) => {
  const show = useCurrentShow(showsByDate);

  const { shoutboxOpen, setShoutboxOpen, videoOpen, setVideoOpen } =
    useShoutBoxAndVideo();

  const handleShoutboxToggle = () => {
    setShoutboxOpen(!shoutboxOpen);
  };

  const handleVideoToggle = () => {
    setVideoOpen(!videoOpen);
  };

  const { pictureUrl, name, hosts } = show ?? {};
  const url = name ? (pictureUrl ?? placeholderImage) : testcard;

  return (
    <div className="flex justify-center p-6">
      <div className="flex w-84 max-w-236 flex-wrap items-center rounded bg-radio-bg200 md:w-full md:flex-nowrap md:justify-start">
        <div className="rounded bg-linear-to-t from-radio-accent via-radio-accent200 to-radio-secondary p-1.5">
          <div className="relative aspect-3/2 w-80 rounded md:w-md lg:w-lg">
            <Image
              src={url}
              // next.config.js has `loader:'custom'` therefore Image component expects loader-prop. Show images 2023 are optimized on built time.
              unoptimized={true}
              alt=""
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
        <div className="mx-6 flex flex-col justify-between py-4 text-white md:mx-10 md:h-full md:py-10">
          {name && (
            <div className="mb-4 flex flex-col">
              <span className="text-radio-accent200">Ohjelmassa nyt</span>
              <span className="text-lg font-bold">{name}</span>
              <span className="opacity-80">
                Juontaa: {hosts ?? 'Haamujuontaja'}
              </span>
            </div>
          )}

          <div className="mb-4 flex w-full flex-wrap items-center gap-4">
            <button
              onClick={onPlayPause}
              title="Play/Pause"
              className={`flex h-20 w-20 items-center justify-center rounded-full cursor-pointer ${
                playing ? 'bg-radio-secondary' : 'bg-radio-accent'
              }`}
            >
              {playing ? (
                <FiPause size="3rem" />
              ) : (
                <FiPlay size="3rem" className="ml-1" />
              )}
            </button>

            <div className={`flex items-center gap-4`}>
              <button
                onClick={handleVideoToggle}
                title="Webcam"
                className={`h-12 w-12 rounded-full cursor-pointer ${
                  videoOpen ? 'bg-radio-secondary' : 'bg-radio-accent'
                }`}
              >
                <FiVideo size="1.7rem" className="mx-auto" />
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <span className="opacity-80">Osallistu keskusteluun</span>
            <button
              className="flex items-center font-bold transition cursor-pointer hover:text-radio-accent200"
              onClick={handleShoutboxToggle}
            >
              <FiMessageSquare className="mr-3 h-6 w-6" /> Shoutboxissa
            </button>
            <a
              className="flex font-bold transition hover:text-radio-accent200"
              href="https://t.me/turunwappuradio"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
            >
              <FaTelegramPlane className="mr-3 h-6 w-6" /> Telegramissa{' '}
              <BsBoxArrowUpRight className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const useCurrentShow = (showsByDate?: Record<string, Show[]>) => {
  const [currentShow, setCurrentShow] = useState<Show | null>(null);

  useEffect(() => {
    const getCurrentShow = () => {
      const now = new Date();
      const currentDate = format(now, 'y.M.dd');
      const todaysShows = showsByDate?.[currentDate];

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

    getCurrentShow();
    const updater = setInterval(getCurrentShow, SHOW_REFRESH_TIME);
    return () => clearInterval(updater);
  }, [showsByDate]);

  return currentShow;
};

export default Player;
