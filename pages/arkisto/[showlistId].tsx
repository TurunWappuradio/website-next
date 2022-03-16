import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ShowlistPathsDocument } from 'contentful/graphql/showlistPaths.graphql';
import { fetchContent, fetchNavigationItems } from 'contentful/client';
import { ShowlistPathsQuery } from 'contentful/graphql/showlistPaths.graphql';
import {
  ShowlistPageDocument,
  ShowlistPageQuery,
} from 'contentful/graphql/showlistPage.graphql';

export enum Color {
  Night = 'night',
  Promote = 'promote',
}
interface ShowsCollectionItem {
  name?: string;
  start?: string;
  end?: string;
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
  shows: ShowsCollectionItem[];
}

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

  const { name, id, showsCollection } = data.programmeCollection.items[0];
  const shows = showsCollection.items.map((item) => ({
    name: item.name,
    start: item.start,
    end: item.end,
    description: item.description,
    picture: item.picture,
    hosts: item.hosts,
    producer: item.producer,
    color: item.color,
  }));

  const navigationItems = await fetchNavigationItems();

  return {
    props: {
      name,
      id,
      shows,
    },
  };
};
