import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

import {
  NavigationItemsDocument,
  NavigationItemsQuery,
} from './graphql/navigation.graphql';

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

let apolloClient: ApolloClient | undefined;

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

const fetchContent = async <T>(
  query: DocumentNode,
  variables?: any
): Promise<T> => {
  try {
    const _apolloClient = apolloClient ?? createApolloClient();
    const { data } = await _apolloClient.query({ query, variables });

    return data as T;
  } catch (error) {
    console.error(
      `There was a problem retrieving entries with the query ${query}`
    );
    console.error(error);
  }
};

const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),

    link: new HttpLink({
      uri:
        'https://graphql.contentful.com/content/v1/spaces/' +
        CONTENTFUL_SPACE_ID,

      headers: {
        Authorization: 'Bearer ' + CONTENTFUL_ACCESS_TOKEN,
      },
    }),
  });
};

export { fetchContent, fetchNavigationItems };
