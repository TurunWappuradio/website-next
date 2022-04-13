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
      className={`flex w-full rounded ${
        isExpanded
          ? 'h-auto rounded-l-none rounded-t lg:rounded-l lg:rounded-t-none'
          : 'h-40'
      }`}
    >
      <p className="mt-0 h-[25px] w-[25px] shrink-0 rotate-90 text-left font-bold text-white shadow lg:flex">
        {format(new Date(show.start), 'p', { locale: fi })}&nbsp;-&nbsp;
        {format(new Date(show.end), 'p', { locale: fi })}
      </p>
      <button
        className={`group relative flex h-full w-full flex-col flex-col-reverse overflow-hidden rounded transition-all md:flex-row  ${
          isExpanded
            ? 'flex rounded md:contents'
            : 'bg-gradient-to-bl from-transparent via-transparent to-blue-darkest'
        }`}
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
      >
        <div
          className={`absolute bottom-1 left-2 z-20 mb-2 w-full translate-y-[4.3rem] flex-col text-left text-white transition group-hover:bottom-2 group-hover:translate-y-0
           ${isExpanded ? 'hidden' : 'block'}`}
        >
          <p
            className={`w-fit rounded-sm px-2 text-lg font-bold ${
              index % 2 === 0 ? 'bg-coral' : 'bg-teal'
            }`}
          >
            {show.name}
          </p>
          <p className="mt-2 px-2 text-sm">Juontaa: {show.hosts}</p>
          <p className="mt-1 px-2 text-sm">Tuottaa: {show.producer}</p>
          <p className="mt-4 h-6 w-80 truncate px-2 text-sm">
            {show.description}
          </p>
        </div>
        <div
          className={`text-box h-100% z-10 mt-auto flex-col overflow-y-auto rounded bg-blue-dark p-4 text-left transition ease-in-out md:ml-auto md:mt-0 md:w-[24rem] ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="text-base font-bold text-teal sm:text-lg">
            {show.name}
          </h2>
          <h3 className="mt-2 text-sm font-bold text-white sm:text-base">
            Juontaa: {show.hosts}
          </h3>
          <h3 className="mt-1 text-sm font-bold text-white sm:text-base">
            Tuottaa: {show.producer}
          </h3>
          <p className="mt-2 text-sm text-white md:text-base">
            {show.description}
          </p>
        </div>
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
              isExpanded
                ? 'rounded-t md:rounded-b md:rounded-l md:rounded-l-none'
                : ''
            }`}
            alt={picture?.title || ''}
          />
        </div>
      </button>
    </div>
  );
};

export default ShowCard;
