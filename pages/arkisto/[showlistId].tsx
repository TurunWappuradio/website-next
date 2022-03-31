import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { format } from 'date-fns';
import { Dispatch, SetStateAction, useState } from 'react';

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
  heroImage: {
    url?: string;
  };
  heroSubtext: string;
}

export const ShowListPage: NextPage<ShowListPageProps> = ({
  name,
  showsByDate,
  heroImage,
  navigationItems,
  heroSubtext,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    Object.keys(showsByDate)[0]
  );
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
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-6">
        <h1 className="mx-6 w-auto text-xl font-bold text-coral md:text-3xl">
          Ohjelmistossa
        </h1>
      </div>
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

  const groupBy = function (xs: any, key: any) {
    return xs.reduce(function (rv: any, x: any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const showsByDate = groupBy(shows, 'date');

  const navigationItems = await fetchNavigationItems();

  return {
    props: {
      name,
      id,
      showsByDate,
      navigationItems,
      heroImage,
      heroSubtext,
    },
  };
};

export default ShowListPage;
