import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { format } from 'date-fns';
import { groupBy } from 'ramda';
import {
  NavigationItemsDocument,
  NavigationItemsQuery,
} from './graphql/navigation.graphql';
import { ShowlistDocument, ShowlistQuery } from './graphql/showlist.graphql';

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export interface NavigationItem {
  name?: string;
  slug?: string;
}

const fetchNavigationItems = async (): Promise<NavigationItem[]> => {
  const navigationItems = await fetchContent<NavigationItemsQuery>(
    NavigationItemsDocument
  );
  return navigationItems.navigationCollection.items[0].pagesCollection.items;
};

export enum Color {
  Night = 'night',
  Promote = 'promote',
}
export interface Show {
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
export interface Picture {
  title?: string;
  description?: null;
  contentType?: string;
  fileName?: string;
  size?: number;
  url?: string;
  width?: number;
  height?: number;
}

const fetchShowlist = async (
  showlistId: string | string[]
): Promise<{
  showsByDate: Record<string, Show[]>;
  shows: Show[];
}> => {
  const data = await fetchContent<ShowlistQuery>(ShowlistDocument, {
    showlistId,
  });
  const showsCollection =
    data.programmeCollection.items[0].showsCollection.items;

  const shows = showsCollection.map((item: any) => ({
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

  return { showsByDate, shows };
};

const fetchContent = async <T>(
  query: DocumentNode,
  variables?: any
): Promise<T> => {
  try {
    const _apolloClient = apolloClient ?? createApolloClient();
    const { data } = await _apolloClient.query({ query, variables });

    return data;
  } catch (error) {
    console.error(
      `There was a problem retrieving entries with the query ${query}`
    );
    console.error(error);
  }
};

const createApolloClient = () => {
  return new ApolloClient({
    uri:
      'https://graphql.contentful.com/content/v1/spaces/' + CONTENTFUL_SPACE_ID,
    headers: {
      Authorization: 'Bearer ' + CONTENTFUL_ACCESS_TOKEN,
    },
    cache: new InMemoryCache(),
  });
};

export { fetchContent, fetchNavigationItems, fetchShowlist };
