import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { format } from 'date-fns';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

import { ShowlistPathsDocument } from 'contentful/graphql/showlistPaths.graphql';
import {
  fetchContent,
  fetchNavigationItems,
  NavigationItem,
} from 'contentful/client';
import { ShowlistPathsQuery } from 'contentful/graphql/showlistPaths.graphql';
import {
  ShowlistPageDocument,
  ShowlistPageQuery,
} from 'contentful/graphql/showlistPage.graphql';
import Hero from 'components/hero';
import ResponsiveShowlist from 'components/responsiveShowlist';
import { useState } from 'react';
import { Showlist } from 'components/showlist';
import { groupBy } from 'ramda';

export enum Color {
  Night = 'night',
  Promote = 'promote',
}
export interface ShowsCollectionItem {
  name?: string;
  start?: string;
  end?: string;
  date?: string;
  description?: null | string;
  picture?: Picture | null;
  hosts?: null | string;
  producer?: null | string;
  color?: Color | null;
}
interface Picture {
  title?: string;
  description?: null;
  contentType?: string;
  fileName?: string;
  size?: number;
  url?: string;
  width?: number;
  height?: number;
}
interface ShowListPageProps {
  name: string;
  id: string;
  navigationItems: NavigationItem[];
  showsByDate: {
    [key: string]: ShowsCollectionItem[];
  };
  shows: ShowsCollectionItem[];
  heroImage: {
    url?: string;
  };
  heroSubtext: string;
}

export const ShowListPage: NextPage<ShowListPageProps> = ({
  name,
  showsByDate,
  heroImage,
  shows,
  navigationItems,
  heroSubtext,
}) => {
  // mode is week or show
  const [mode, setMode] = useState<string>('show');

  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>{`Turun Wappuradio ${name}`}</title>
        <meta name="description" content="Wappuradioo tält puolt jokkee" />
      </Head>
      <Hero
        title={name}
        image={heroImage}
        navigationItems={navigationItems}
        subtext={heroSubtext}
      />
      <Showlist showsByDate={showsByDate} shows={shows} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pathsResult = await fetchContent<ShowlistPathsQuery>(
    ShowlistPathsDocument
  );
  const paths = pathsResult.programmeCollection.items.map((item) => ({
    params: {
      showlistId: item.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { showlistId } = context.params;

  const data = await fetchContent<ShowlistPageQuery>(ShowlistPageDocument, {
    showlistId,
  });

  const { name, id, showsCollection, heroImage, heroSubtext } =
    data.programmeCollection.items[0];

  const shows = showsCollection.items.map((item) => ({
    name: item.name,
    start: item.start,
    end: item.end,
    date: format(new Date(item.start), 'y.M.dd'),
    description: item.description,
    picture: item.picture,
    hosts: item.hosts,
    producer: item.producer,
    color: item.color,
  }));

  const showsByDate = groupBy(
    (day: any) => format(new Date(day.start), 'y.M.dd'),
    shows
  );

  const navigationItems = await fetchNavigationItems();

  return {
    props: {
      name,
      id,
      showsByDate,
      shows,
      navigationItems,
      heroImage,
      heroSubtext,
    },
  };
};

export default ShowListPage;
