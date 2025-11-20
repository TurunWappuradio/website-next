import { Fragment, useMemo, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { fi } from 'date-fns/locale/fi';

import { Show } from '@/scripts/google/showlistHelpers';
import placeholderImage from '../public/kuva_puuttuu_v2.jpeg';

interface ShowCard {
  show: Show;
  index: number;
  className?: string;
  forceOpen?: boolean;
}

export const ShowCard = ({ show, index, className, forceOpen }: ShowCard) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(forceOpen ?? false);

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`flex w-full rounded ${className} ${
        isExpanded
          ? 'h-auto rounded-l-none rounded-t lg:rounded-l lg:rounded-t-none'
          : 'h-40'
      }`}
    >
      <Time start={show.start} end={show.end} />
      <button
        className={`group relative flex h-full w-full flex-col-reverse overflow-hidden rounded md:flex-row ${
          isExpanded
            ? 'flex rounded md:contents'
            : 'bg-linear-to-bl from-transparent via-transparent to-blue-darkest'
        } ${forceOpen ? '' : 'cursor-pointer'}`}
        onClick={handleClick}
      >
        <TitleInfo show={show} isExpanded={isExpanded} index={index} />
        <Descriptions show={show} isExpanded={isExpanded} />
        <ShowImage show={show} isExpanded={isExpanded} />
      </button>
    </div>
  );
};

interface TimeProps {
  start: string;
  end: string;
}

const Time = ({ start, end }: TimeProps) => {
  const startTime = format(new Date(start), 'p', { locale: fi });
  const endTime = format(new Date(end), 'p', { locale: fi });

  return (
    <p className="mt-1 h-[25px] w-[25px] rotate-90 whitespace-nowrap font-bold text-white">
      {startTime} – {endTime}
    </p>
  );
};

interface TitleInfoProps {
  show: Show;
  isExpanded: boolean;
  index: number;
}

const TitleInfo = ({ show, isExpanded, index }: TitleInfoProps) => {
  return (
    <div
      className={`absolute bottom-1 z-20 max-w-full flex-col px-2 text-left text-white
           ${isExpanded ? 'hidden' : 'block'}`}
    >
      <p
        className={`w-fit rounded-sm px-2 text-base font-bold md:text-lg ${
          index % 2 === 0 ? 'bg-radio-accent' : 'bg-radio-secondary'
        }`}
      >
        {show.name}
      </p>
      <p className="mt-2 px-2 text-sm">
        Juontaa: {show.hosts ?? 'Haamujuontaja'}
      </p>
    </div>
  );
};

interface DescriptionsProps {
  show: Show;
  isExpanded: boolean;
}

const Descriptions = ({ show, isExpanded }: DescriptionsProps) => {
  // Add hyperlinks to words that start with https://
  const linkedDescription = useMemo(() => {
    if (!show.description) return null;
    const words = show.description.split(/(\s+)/);
    return words.map((word, idx) => {
      if (word.startsWith('https://')) {
        return (
          <a
            key={idx}
            href={word}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-radio-accent"
          >
            {word}
          </a>
        );
      }
      return <Fragment key={idx}>{word}</Fragment>;
    });
  }, [show.description]);

  return (
    <div
      className={`z-10 mt-auto flex flex-col overflow-y-auto rounded bg-radio-bg200 p-4 text-left transition ease-in-out md:ml-auto md:mt-0 md:h-80 xl:h-100 ${
        isExpanded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h2 className="text-base font-bold text-radio-accent200 sm:text-lg">
        {show.name}
      </h2>
      <h3 className="mt-2 text-sm font-bold text-white sm:text-base">
        Juontaa: {show.hosts ?? 'Haamujuontaja'}
      </h3>
      <h3 className="mt-1 text-sm font-bold text-white sm:text-base">
        Tuottaa: {show.producer ?? 'Toimitus'}
      </h3>
      <p className="mt-2 text-sm text-white md:text-base">
        {linkedDescription}
      </p>
    </div>
  );
};

interface ShowImageProps {
  show: Show;
  isExpanded: boolean;
}

const ShowImage = ({ show, isExpanded }: ShowImageProps) => {
  const { pictureUrl, name } = show;
  const url = pictureUrl || placeholderImage;

  return (
    <div
      className={
        isExpanded
          ? 'relative aspect-3/2 h-full w-full flex-none md:h-80 md:w-120 xl:h-100 xl:w-150'
          : ''
      }
    >
      <Image
        src={url}
        unoptimized
        layout={'fill'}
        objectPosition={'65% 35%'}
        className={`-z-10  ${
          isExpanded
            ? 'rounded-t md:rounded-b md:rounded-l-none'
            : 'opacity-70 transition duration-300 ease-in-out md:group-hover:scale-110 md:group-hover:opacity-100'
        }`}
        alt={name || ''}
        style={{
          maxWidth: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default ShowCard;
