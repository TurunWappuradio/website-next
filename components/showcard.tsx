import { ShowsCollectionItem } from 'pages/arkisto/[showlistId]';
import { format } from 'date-fns';
import fi from 'date-fns/locale/fi';
import Image from 'next/image';
import { imageLoader } from 'contentful/imageLoader';
import heroImage from '../public/hero.jpeg';
import { useState } from 'react';

interface ShowCard {
  show: ShowsCollectionItem;
  index: number;
}

export const ShowCard: React.FC<ShowCard> = ({ show, index }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { picture } = show;
  const url = picture?.url || heroImage;
  const loader = picture?.url ? imageLoader : undefined;

  return (
    <div className={`mx-auto flex w-full ${isExpanded ? 'h-auto' : 'h-52'}`}>
      {!!!show.color && (
        <p className="-mx-8 mb-auto mt-11 h-6 shrink-0 rotate-90 text-center font-bold text-white">
          {format(new Date(show.start), 'p', { locale: fi })} -{' '}
          {format(new Date(show.end), 'p', { locale: fi })}
        </p>
      )}
      <button
        className="relative flex h-full w-full flex-col rounded-xl bg-gradient-to-b from-transparent to-blue-darkest"
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
      >
        <Image
          src={url}
          loader={loader}
          priority={true}
          layout="fill"
          objectFit="cover"
          className="-z-10 rounded-xl"
          alt={picture?.title || ''}
        />
        <div
          className={`mt-auto mb-2 w-full px-2 text-left text-white ${
            isExpanded ? 'hidden' : 'block'
          }`}
        >
          {show?.color ? (
            <div className="flex space-x-2 px-2 text-xl font-bold">
              <p className="text-white">
                {format(new Date(show.start), 'p', { locale: fi })}
              </p>
              <p className="text-coral">{show.name}</p>
            </div>
          ) : (
            <p
              className={`text-bold font-bol rounded-sm px-2 text-lg ${
                index % 2 === 0 ? 'bg-coral' : 'bg-teal'
              }`}
            >
              {show.name}
            </p>
          )}
          <p className="px-2">{show.hosts}</p>
        </div>
        <div
          className={`z-10 ml-auto h-full w-3/5 flex-col rounded-r-xl bg-blue-dark p-4 text-left md:w-2/5 ${
            isExpanded ? 'flex' : 'hidden'
          }`}
        >
          <h2 className="text-base font-bold text-teal sm:text-lg">
            {show.name}
          </h2>
          <h3 className="mt-2 text-sm font-bold text-white sm:text-base">
            {show.hosts}
          </h3>
          <p className="mt-4 text-xs text-white sm:text-sm">
            {show.description}
          </p>
        </div>
      </button>
    </div>
  );
};

export default ShowCard;
