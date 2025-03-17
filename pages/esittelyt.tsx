import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Footer from '@/components/footer';
import Hero from '@/components/hero';
import {
  fetchContent,
  fetchNavigationItems,
  NavigationItem,
} from '@/contentful/client';
import {
  EsittelytDocument,
  EsittelytQuery,
} from '@/contentful/graphql/esittelytPage.graphql';

interface EsittelytProps {
  navigationItems?: NavigationItem[] | null;
  esittelyt: Esittely[];
}

interface Esittely {
  name?: string | null;
  description?: any;
  picture?: {
    url?: string | null;
  };
  className?: string;
}

const PresentationCard: React.FC<{ esittely: Esittely }> = ({ esittely }) => {
  const { name, description, picture, className } = esittely;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`my-4 flex w-full flex-col rounded ${className} transition-all duration-300 ${
        isExpanded ? 'h-auto' : 'h-96'
      }`}
    >
      <button
        className={`group relative flex w-full flex-col overflow-hidden rounded ${
          isExpanded
            ? 'bg-transparent'
            : 'bg-gradient-to-bl from-transparent via-transparent to-blue-darkest'
        }`}
        onClick={handleClick}
      >
        <PresImage esittely={esittely} isExpanded={isExpanded} />
        <TitleInfo esittely={esittely} isExpanded={isExpanded} />
      </button>
      {isExpanded && (
        <Descriptions esittely={esittely} isExpanded={isExpanded} />
      )}
    </div>
  );
};

const EsittelytPage: NextPage<EsittelytProps> = ({
  navigationItems,
  esittelyt,
}) => {
  const data = fetchContent<EsittelytQuery>(EsittelytDocument);

  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>Turun Wappuradion Hallitus ja Tiimivastaavat</title>
        <meta
          name="description"
          content="Turun Wappuradion Hallitus ja Tiimivastaavat"
        />
      </Head>
      <Hero
        title="Esittelyt"
        subtext="Turun Wappuradion Hallitus ja Tiimivastaavat"
        navigationItems={navigationItems}
        isCompact={true}
      />
      <article className="mx-auto max-w-4xl px-4 pb-20 pt-12 text-white">
        <h1 className="my-4 text-3xl font-bold text-radio-accent200">
          Ketä me ollaan?
        </h1>
        {
          <div className="grid grid-cols-2 gap-4">
            {esittelyt.map((esittely) => (
              <PresentationCard key={esittely.name} esittely={esittely} />
            ))}
          </div>
        }
      </article>
      <Footer navigationItems={navigationItems} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<EsittelytProps> = async () => {
  const data = await fetchContent<EsittelytQuery>(EsittelytDocument);
  const navigationItems = await fetchNavigationItems();

  const esittelyt: Esittely[] = data.presentationCollection.items;

  return {
    props: {
      esittelyt,
      navigationItems,
    },
  };
};

interface TitleInfoProps {
  esittely: Esittely;
  isExpanded: boolean;
}

const TitleInfo = ({ esittely, isExpanded }: TitleInfoProps) => {
  return (
    <div
      className={`absolute bottom-1 z-20 max-w-full flex-col px-2 text-left text-white
           ${isExpanded ? 'hidden' : 'block'}`}
    >
      <p className={`w-fit rounded-sm px-2 text-base font-bold md:text-lg`}>
        {esittely.name}
      </p>
    </div>
  );
};

interface DescriptionProps {
  esittely: Esittely;
  isExpanded: boolean;
}

const Descriptions = ({ esittely, isExpanded }: DescriptionProps) => {
  return (
    <div
      className={`z-10 flex flex-col overflow-y-auto rounded bg-radio-bg p-4 text-left transition-opacity duration-300 ease-in-out ${
        isExpanded ? 'h-auto max-h-full opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <h2 className="text-base font-bold text-radio-action sm:text-lg">
        {esittely.name}
      </h2>
      <div className="mt-2 text-sm text-white md:text-base">
        {esittely.description && esittely.description.json
          ? documentToReactComponents(esittely.description.json)
          : null}
      </div>
    </div>
  );
};

interface PresImageProps {
  esittely: Esittely;
  isExpanded: boolean;
}

const PresImage = ({ esittely, isExpanded }: PresImageProps) => {
  const { picture, name } = esittely;
  const url = picture.url;

  return (
    <div
      className={`relative aspect-[3/2] w-full flex-none transition-all duration-300 ${
        isExpanded ? 'h-48' : 'h-96'
      }`}
    >
      <Image
        src={url}
        unoptimized
        layout={'fill'}
        objectFit="cover"
        objectPosition={'top'}
        className={`-z-10 transition-opacity duration-300 ease-in-out ${
          isExpanded
            ? 'opacity-100'
            : 'opacity-70 md:group-hover:scale-110 md:group-hover:opacity-100'
        }`}
        alt={name || ''}
      />
    </div>
  );
};

export default EsittelytPage;
