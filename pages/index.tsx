import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';

import { renderRichtext } from 'utils/richtext';
import { fetchContent } from 'utils/contentful';
import Hero from 'components/hero';
import { IndexDocument, IndexQuery } from './index.graphql';

interface IndexProps {
  content: any;
  heroImage: {
    url?: string;
  };
  heroTitle: string;
  heroSubtext: string;
  heroButtonText: string;
  heroButtonLink: string;
}

const Index: NextPage<IndexProps> = ({
  content,
  heroImage,
  heroTitle,
  heroSubtext,
  heroButtonText,
  heroButtonLink,
}) => {
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>Turun Wappuradio</title>
        <meta name="description" content="Wappuradioo tält puolt jokkee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero
        image={heroImage}
        title={heroTitle}
        subtext={heroSubtext}
        buttonLink={heroButtonLink}
        buttonText={heroButtonText}
      />
      <div className="mx-auto pt-12 max-w-4xl text-white">{renderRichtext(content)}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const data = await fetchContent<IndexQuery>(IndexDocument);

  const { heroImage, content, heroTitle, heroSubtext, heroButtonText, heroButtonLink } =
    data.indexCollection.items[0];

  return {
    props: {
      heroImage,
      content,
      heroTitle,
      heroSubtext,
      heroButtonText,
      heroButtonLink,
    },
  };
};

export default Index;
