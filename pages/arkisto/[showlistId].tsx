import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
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
import { format, Locale } from 'date-fns';
import Head from 'next/head';
import Hero from 'components/hero';
import fi from 'date-fns/locale/fi';
import { Dispatch, SetStateAction, useState } from 'react';

interface DateButton {
  value: string;
  isSelected: boolean;
  onClick: Dispatch<SetStateAction<string>>;
}

const DateButton: React.FC<DateButton> = ({ value, isSelected, onClick }) => {
  const str = format(new Date(value), 'EEEE d.M', { locale: fi });
  const text = str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <button
      className={`rounded-sm p-2 text-left text-white ${
        isSelected ? 'bg-coral' : 'bg-blue-dark hover:text-coral'
      }`}
      onClick={() => onClick(value)}
    >
      {text}
    </button>
  );
};

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
  byDate: {
    [key: string]: ShowsCollectionItem[];
  };
  heroImage: {
    url?: string;
  };
  heroSubtext: string;
}

export const ShowListPage: React.FC<ShowListPageProps> = ({
  name,
  id,
  byDate,
  heroImage,
  navigationItems,
  heroSubtext,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    Object.keys(byDate)[0]
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
      <div className="mx-auto max-w-4xl px-4 pt-12">
        <h1 className="text-5xl font-bold text-coral">Ohjelmistossa</h1>
        <div className="flex pt-8">
          <div>asd</div>
          <div className="ml-auto flex max-w-xs flex-col space-y-2">
            {Object.keys(byDate).map((date) => (
              <DateButton
                key={date}
                value={date}
                isSelected={selectedDate === date}
                onClick={(date) => setSelectedDate(date)}
              />
            ))}
          </div>
        </div>
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

  const byDate = groupBy(shows, 'date');

  const navigationItems = await fetchNavigationItems();

  return {
    props: {
      name,
      id,
      byDate,
      navigationItems,
      heroImage,
      heroSubtext,
    },
  };
};

export default ShowListPage;
