import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  getISOWeek,
  parse,
} from 'date-fns';
import { groupBy, head, keys, last } from 'ramda';
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
  description?: null | string;
  pictureUrl?: string | null;
  hosts?: null | string;
  producer?: null | string;
  color?: Color | null;
}

export const parseQueryResultToShowlist = (data: ShowlistQuery) => {
  const showsCollection =
    data.programmeCollection.items[0].showsCollection.items;

  const shows = showsCollection.map((item: any) => ({
    name: item.name,
    start: item.start,
    end: item.end,
    description: item.description,
    pictureUrl: item.picture?.url || null,
    hosts: item.hosts,
    producer: item.producer,
    color: item.color,
  }));
  return shows;
};

export const showsToGroups = (shows: Show[]) => {
  const showsByDate = groupBy(
    (day: any) => format(new Date(day.start), 'y.M.dd'),
    shows
  );
  const weekKeys = generateWeekObj(showsByDate);
  return { showsByDate, weekKeys };
};

const fetchShowlist = async (
  showlistId: string | string[]
): Promise<{
  showsByDate: Record<string, Show[]>;
  weekKeys: Record<string, string[]>;
}> => {
  const data = await fetchContent<ShowlistQuery>(ShowlistDocument, {
    showlistId,
  });

  const shows = parseQueryResultToShowlist(data);
  return showsToGroups(shows);
};

// Generate a nicely formatted object to use as keys.
const generateWeekObj = (showsByDate: Record<string, Show[]>) => {
  const start = parse(head(keys(showsByDate)), 'y.M.dd', new Date());
  const end = parse(last(keys(showsByDate)), 'y.M.dd', new Date());
  const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });

  const weekObj = weeks.reduce(
    (acc: Record<string, string[]>, weekStart: Date) => {
      const weekKey = getISOWeek(weekStart).toString();
      const days = eachDayOfInterval({
        start: weekStart,
        end: addDays(new Date(weekStart), 6),
      }).map((day: Date) => format(day, 'y.M.dd'));
      acc[weekKey] = days;
      return acc;
    },
    {}
  );

  return weekObj;
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
