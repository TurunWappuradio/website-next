import { EsittelytDocument, EsittelytQuery } from 'contentful/graphql/esittelytPage.graphql';
import { fetchContent, fetchNavigationItems, NavigationItem } from 'contentful/client';
import { contentfulImageLoader } from 'contentful/contentfulImageLoader';
//import { props } from 'ramda';

import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';


import Footer from 'components/footer';
import Hero from 'components/hero';

import { useEffect, useState } from 'react';

interface EsittelytProps {
  navigationItems?: NavigationItem[] | null;
  esittelyt:Esittely[];
}

interface Esittely {
  name?:string | null
  description?: any
  index: number
  picture?:{
    url?:string | null
  }
  forceOpen?: boolean
  className?: string
}

const ExhibitionListCard: React.FC<{ esittely: Esittely }> = ({ esittely }) => {
  const { name, description, index, picture, forceOpen, className} = esittely;
  const [isExpanded, setIsExpanded] = useState<boolean>(forceOpen ?? false);
  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`flex w-full rounded my-4 ${className} ${
        isExpanded
          ? 'h-auto rounded-l-none rounded-t lg:rounded-l lg:rounded-t-none'
          : 'h-40'
      }`}
    >
      <button
        className={`group relative flex h-full w-full flex-col-reverse overflow-hidden rounded md:flex-row  ${
          isExpanded
            ? 'flex rounded md:contents'
            : 'bg-gradient-to-bl from-transparent via-transparent to-blue-darkest'
        }`}
        onClick={handleClick}
      >
        <TitleInfo esittely={esittely} isExpanded={isExpanded} index={index} />
        <Descriptions esittely={esittely} isExpanded={isExpanded} />
        <ShowImage esittely={esittely} isExpanded={isExpanded} />
      </button>
    </div>
  );
};


const EsittelytPage: NextPage<EsittelytProps> = ({ navigationItems, esittelyt }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchContent<EsittelytQuery>(EsittelytDocument);
      setLoading(false);
    }
    
    fetchData();
  }, []);

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
      <h1 className="my-4 text-3xl font-bold text-coral">Ketä me ollaan?</h1>
      {loading ? (
          <p>Lataa...</p>
        ) : (
          <div>
            {esittelyt.map((esittely, index) => (
              <ExhibitionListCard key={index} esittely={esittely} />
            ))}
          </div>
        )}
    </article>
    <Footer navigationItems={navigationItems} />
  </div>
  );
};

export const getStaticProps:GetStaticProps<EsittelytProps> = async () => {
  const data = await fetchContent<EsittelytQuery>(EsittelytDocument);
  const navigationItems = await fetchNavigationItems();

  const items = data?.hallitusJaTiimiesittelyt2024Collection?.items;
    const esittelyt: Esittely[] = items
      ? items.map((item: any) => ({
          name: item.name || null,
          description:{
            json: item.description.json || null
          },
          picture: {
            url: item.picture?.url || null
          },
          index: item.index || 0,
          forceOpen: item.forceOpen || false,
          className: item.className || ''
        }))
      : [];

  return  {
    props:{
      navigationItems,
      esittelyt
    }
  };
};

interface TitleInfoProps {
  esittely: Esittely
  isExpanded: boolean
  index: number
}

const TitleInfo = ({ esittely, isExpanded, index }: TitleInfoProps) => {
  return (
    <div
      className={`absolute bottom-1 z-20 max-w-full flex-col px-2 text-left text-white
           ${isExpanded ? 'hidden' : 'block'}`}
    >
      <p
        className={`w-fit rounded-sm px-2 text-base font-bold md:text-lg ${
          index % 2 === 0 ? 'bg-coral' : 'bg-teal'
        }`}
      >
        {esittely.name}
      </p>
    </div>
  );
};

interface DescriptionsProps {
  esittely: Esittely
  isExpanded: boolean
}

const Descriptions = ({ esittely, isExpanded }: DescriptionsProps) => {
  
  return (
    <div
      className={`z-10 mt-auto flex flex-col overflow-y-auto rounded bg-blue-dark p-4 text-left transition ease-in-out md:ml-auto md:mt-0 md:h-[20rem] xl:h-[25rem] ${
        isExpanded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h2 className="text-base font-bold text-teal sm:text-lg">{esittely.name}</h2>
      <div className="mt-2 text-sm text-white md:text-base">
        {esittely.description && esittely.description.json ? (
            documentToReactComponents(esittely.description.json)
          ) : null}
      </div>
    </div>
  );
};

interface ShowImageProps {
  esittely: Esittely;
  isExpanded: boolean;
}

const ShowImage = ({ esittely, isExpanded }: ShowImageProps) => {
  const { picture, name } = esittely;
  const url = picture.url;

  return (
    <div
      className={
        isExpanded
          ? 'relative aspect-[3/2] h-full w-full flex-none md:h-[20rem] md:w-[30rem] xl:h-[25rem] xl:w-[37.5rem]'
          : ''
      }
    >
      <Image
        src={url}
        unoptimized
        layout={'fill'}
        objectFit="cover"
        objectPosition={'65% 35%'}
        className={`-z-10  ${
          isExpanded
            ? 'rounded-t md:rounded-b md:rounded-l md:rounded-l-none '
            : 'opacity-70 transition duration-300 ease-in-out md:group-hover:scale-110 md:group-hover:opacity-100'
        }`}
        alt={name || ''}
      />
    </div>
  );
};

export default EsittelytPage;
