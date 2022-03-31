import { format } from 'date-fns';
import fi from 'date-fns/locale/fi';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { ShowsCollectionItem } from 'pages/arkisto/[showlistId]';
import { contentfulImageLoader } from 'contentful/contentfulImageLoader';
import placeholderImage from '../public/kuva_puuttuu_v2.jpeg';

interface ShowCard {
  show: ShowsCollectionItem;
  index: number;
}

export const ShowCard = ({ show, index }: ShowCard) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const ref = useRef(null);

  const { picture } = show;
  const url = picture?.url || placeholderImage;
  const loader = picture?.url ? contentfulImageLoader : undefined;

  return (
    <div
      className={`mx-auto flex w-full rounded ${
        isExpanded
          ? 'h-auto rounded-l-none rounded-t lg:rounded-l lg:rounded-t-none'
          : 'h-52'
      }`}
    >
      <p className="mt-0 h-[24px] w-[25px] shrink-0 rotate-90 text-left font-bold text-white shadow lg:flex">
        {format(new Date(show.start), 'p', { locale: fi })}&nbsp;-&nbsp;
        {format(new Date(show.end), 'p', { locale: fi })}
      </p>
      <button
        className={`group relative mr-6 flex h-full w-full flex-col overflow-hidden rounded transition-all md:flex-row lg:mr-0 ${
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
            unoptimized={picture?.url ? false : true}
            layout={'fill'}
            objectFit="cover"
            className={`-z-10 ${
              isExpanded ? 'rounded-t md:rounded-l md:rounded-r-none' : ''
            }`}
            alt={picture?.title || ''}
          />
        </div>
        <div
          className={`absolute bottom-1 left-2 z-20 mb-2 w-full flex-col text-left text-white group-hover:translate-y-8 ${
            isExpanded ? 'opacity-0' : 'opacity-100'
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
          className={`text-box z-10 mt-auto h-auto flex-col overflow-y-auto rounded bg-blue-dark p-4 text-left transition ease-in-out md:ml-auto md:mt-0 md:w-[286px] ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="text-base font-bold text-teal sm:text-lg">
            {show.name}
          </h2>
          <h3 className="mt-2 text-sm font-bold text-white sm:text-base">
            Juontaa: {show.hosts}
          </h3>
          <h3 className="mt-2 text-sm font-bold text-white sm:text-base">
            Tuottaa: {show.producer}
          </h3>
          <p className="mt-4 text-xs text-white sm:text-sm">
            {show.description}
          </p>
        </div>
      </button>
      <style jsx>{`
        @media (min-width: 768px) {
          .text-box {
            max-height: ${ref?.current?.getBoundingClientRect()?.height}px;
          }
        }
      `}</style>
    </div>
  );
};

export default ShowCard;
