import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { fetchContent } from 'contentful/client';
import { renderRichtext } from 'contentful/renderRichtext';
import {
  ContentPagePathsDocument,
  ContentPagePathsQuery,
} from 'contentful/contentPagePaths.graphql';
import { ContentPageDocument, ContentPageQuery } from 'contentful/contentPage.graphql';

interface ContentPageProps {
  content: any;
}

const ContentPage: NextPage<ContentPageProps> = ({ content }) => {
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>Turun Wappuradio</title>
        <meta name="description" content="Wappuradioo tält puolt jokkee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
  const { content } = data.contentPageCollection.items[0];

  return {
    props: {
      content,
    },
  };
};

export default ContentPage;
