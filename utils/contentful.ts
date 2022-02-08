import { ApolloClient, DocumentNode, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const fetchContent = async <T>(query: DocumentNode): Promise<T> => {
  try {
    const _apolloClient = apolloClient ?? createApolloClient();
    const { data } = await _apolloClient.query({ query });

    return data;
  } catch (error) {
    console.error(`There was a problem retrieving entries with the query ${query}`);
    console.error(error);
  }
};

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'https://graphql.contentful.com/content/v1/spaces/' + CONTENTFUL_SPACE_ID,
    headers: {
      Authorization: 'Bearer ' + CONTENTFUL_ACCESS_TOKEN,
    },
    cache: new InMemoryCache(),
  });
};

const imageLoader = ({ src, width, quality }: { src: string; width: number; quality: number }) => {
  return `${src}?q=${quality || 100}&w=${width}&fm=webp`;
};

export { fetchContent, imageLoader };
