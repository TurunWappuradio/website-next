import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { fetchContent, fetchNavigationItems, NavigationItem } from 'contentful/client';
import { renderRichtext } from 'contentful/renderRichtext';
import {
  ContentPagePathsDocument,
  ContentPagePathsQuery,
} from 'contentful/contentPagePaths.graphql';
import { ContentPageDocument, ContentPageQuery } from 'contentful/contentPage.graphql';
import Hero from 'components/hero';

interface ContentPageProps {
  name: string;
  description: string;
  heroImage: {
    url?: string;
  };
  heroSubtext: string;
  heroButtonText: string;
  heroButtonLink: string;
  navigationItems: NavigationItem[];
  content: any;
}

const ContentPage: NextPage<ContentPageProps> = ({
  name,
  description,
  heroImage,
  heroSubtext,
  heroButtonText,
  heroButtonLink,
  navigationItems,
  content,
}) => {
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>{name}</title>
        <meta name="description" content={description} />
      </Head>
      <Hero
        image={heroImage}
        title={name}
        subtext={heroSubtext}
        buttonLink={heroButtonLink}
        buttonText={heroButtonText}
        navigationItems={navigationItems}
      />
      <div className="mx-auto pt-12 max-w-4xl text-white">{renderRichtext(content)}</div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pathsResult = await fetchContent<ContentPagePathsQuery>(ContentPagePathsDocument);
  const paths = pathsResult.contentPageCollection.items.map((item) => ({
    params: { slug: item.slug.split('/') },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ContentPageProps> = async (context) => {
  const { slug } = context.params;

  const slugJoined = typeof slug === 'string' ? slug : slug.join('/');

  const data = await fetchContent<ContentPageQuery>(ContentPageDocument, { slug: slugJoined });
  const { name, description, heroImage, heroSubtext, heroButtonLink, heroButtonText, content } =
    data.contentPageCollection.items[0];

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

export default ContentPage;
