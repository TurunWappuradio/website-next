import { format } from 'date-fns';
import fi from 'date-fns/locale/fi';
import Image from 'next/image';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { ShowsCollectionItem } from 'pages/arkisto/[showlistId]';
import { imageLoader } from 'contentful/imageLoader';
import heroImage from '../public/hero.jpeg';

interface ShowCard {
  show: ShowsCollectionItem;
  index: number;
}

export const ShowCard = ({ show, index }: ShowCard) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const ref = useRef(null);
  const [minWidth, setMinWidth] = useState<number>(200);

  const { picture } = show;
  const url = picture?.url || heroImage;
  const loader = picture?.url ? imageLoader : undefined;

  return (
    <div
      className={`mx-auto flex w-full rounded ${
        isExpanded
          ? 'h-auto rounded-l-none rounded-t lg:rounded-l lg:rounded-t-none'
          : 'h-52'
      }`}
    >
      <p className="-mx-8 mb-auto mt-11 h-6 shrink-0 rotate-90 text-center font-bold text-white shadow">
        {format(new Date(show.start), 'p', { locale: fi })} -{' '}
        {format(new Date(show.end), 'p', { locale: fi })}
      </p>
      <button
        className={`group relative flex h-full w-full flex-col overflow-hidden rounded transition-all md:flex-row ${
          isExpanded
            ? 'flex rounded md:contents'
            : 'bg-gradient-to-b from-transparent to-blue-darkest'
        }`}
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
      >
        <div
          ref={ref}
          className={`aspect-[3/2] w-full ${
            isExpanded ? 'image-container relative' : ''
          }`}
        >
          <Image
            src={url}
            loader={loader}
            priority={true}
            layout={'fill'}
            objectFit="cover"
            className={`-z-10 ${
              isExpanded ? 'rounded-t md:rounded-l md:rounded-r-none' : ''
            }`}
            alt={picture?.title || ''}
          />
        </div>
        <div
          className={`absolute bottom-1 left-2 z-20 mb-2 w-full flex-col text-left text-white transition  group-hover:translate-y-8 ${
            isExpanded ? 'hidden' : 'flex'
          }`}
        >
          <p
            className={`w-fit rounded-sm px-2 text-lg font-bold ${
              index % 2 === 0 ? 'bg-coral' : 'bg-teal'
            }`}
          >
            {show.name}
          </p>
          <p className="mt-1 px-2 text-sm">Juontaa: {show.hosts}</p>
        </div>
        <div
          className={`text-box z-10 mt-auto h-auto flex-col overflow-y-auto rounded bg-blue-dark p-4 text-left  md:ml-auto md:mt-0 md:w-[286px] ${
            isExpanded ? 'reveal flex' : 'unreveal hidden'
          }`}
        >
          <h2 className="text-base font-bold text-teal sm:text-lg">
            {show.name}
          </h2>
          <h3 className="mt-2 text-sm font-bold text-white sm:text-base">
            Juontaa: {show.hosts}
          </h3>
          <p className="mt-4 text-xs text-white sm:text-sm">
            {show.description}
          </p>
        </div>
      </button>
      <style jsx>{`
        .reveal {
          animation: reveal 0.5s ease;
        }
        .unreveal {
          animation: unreveal 0.5s ease;
        }

        @media (min-width: 768px) {
          .text-box {
            max-height: ${ref?.current?.getBoundingClientRect()?.height}px;
          }
        }

        @keyframes reveal {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }
        @keyframes unreveal {
          0% {
            opacity: 1;
            transform: translateY(0px);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default ShowCard;
