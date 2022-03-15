import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
  ContentPagePathsDocument,
  ContentPagePathsQuery,
} from 'contentful/contentPagePaths.graphql';
import {
  fetchContent,
  fetchNavigationItems,
  NavigationItem,
} from 'contentful/client';

export const getStaticPaths: GetStaticPaths = async () => {
  const pathsResult = await fetchContent<ContentPagePathsQuery>(
    ContentPagePathsDocument
  );
  const paths = pathsResult.contentPageCollection.items.map((item) => ({
    params: { slug: item.slug.split('/') },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ContentPageProps> = async (
  context
) => {
  const { slug } = context.params;

  const slugJoined = typeof slug === 'string' ? slug : slug.join('/');

  const data = await fetchContent<ContentPageQuery>(ContentPageDocument, {
    slug: slugJoined,
  });
  const {
    name,
    description,
    heroImage,
    heroSubtext,
    heroButtonLink,
    heroButtonText,
    content,
  } = data.contentPageCollection.items[0];

  const navigationItems = await fetchNavigationItems();

  return {
    props: {
      name,
      description,
      heroImage,
      heroSubtext,
      heroButtonLink,
      heroButtonText,
      navigationItems,
      content,
    },
  };
};
