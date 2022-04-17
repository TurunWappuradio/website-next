import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { format } from 'date-fns';
import { groupBy } from 'ramda';
import { useState } from 'react';

import { ShowlistPathsDocument } from 'contentful/graphql/showlistPaths.graphql';
import {
  fetchContent,
  fetchNavigationItems,
  fetchShowlist,
  NavigationItem,
  Show,
} from 'contentful/client';
import { ShowlistPathsQuery } from 'contentful/graphql/showlistPaths.graphql';
import {
  ShowlistPageDocument,
  ShowlistPageQuery,
} from 'contentful/graphql/showlistPage.graphql';
import Hero from 'components/hero';
import { Showlist } from 'components/showlist';
import { BsArrowLeft } from 'react-icons/bs';
import Link from 'next/link';

interface ShowListPageProps {
  name: string;
  id: string;
  navigationItems: NavigationItem[];
  showsByDate: {
    [key: string]: Show[];
  };
  weekKeys: Record<string, string[]>;
  heroImage: {
    url?: string;
  };
  heroSubtext: string;
}

export const ShowListPage: NextPage<ShowListPageProps> = ({
  name,
  showsByDate,
  heroImage,
  weekKeys,
  navigationItems,
  heroSubtext,
}) => {
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
      <div className="mx-auto flex max-w-6xl flex-col py-6">
        <Link href="/arkisto">
          <a className="my-6 ml-4 mr-auto flex font-bold text-teal transition hover:text-coral">
            <BsArrowLeft className="mr-2 h-6 w-6" />
            Kaikki ohjelmakartat
          </a>
        </Link>
      </div>
      <Showlist showsByDate={showsByDate} weekKeys={weekKeys} />
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

  const { name, id, heroImage, heroSubtext } =
    data.programmeCollection.items[0];

  const { showsByDate, weekKeys } = await fetchShowlist(showlistId);

  const navigationItems = await fetchNavigationItems();

  return {
    props: {
      name,
      id,
      showsByDate,
      weekKeys,
      navigationItems,
      heroImage,
      heroSubtext,
    },
  };
};

export default ShowListPage;
