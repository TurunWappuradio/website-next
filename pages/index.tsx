import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';

import { fetchContent, fetchNavigationItems, NavigationItem } from 'contentful/client';
import { renderRichtext } from 'contentful/renderRichtext';
import Hero from 'components/hero';
import { IndexDocument, IndexQuery } from 'contentful/index.graphql';
import Footer from 'components/footer';

interface IndexProps {
  content: any;
  heroImage: {
    url?: string;
  };
  heroTitle: string;
  heroSubtext: string;
  heroButtonText: string;
  heroButtonLink: string;
  navigationItems: NavigationItem[];
}

const Index: NextPage<IndexProps> = ({
  content,
  heroImage,
  heroTitle,
  heroSubtext,
  heroButtonText,
  heroButtonLink,
  navigationItems,
}) => {
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>Turun Wappuradio</title>
        <meta name="description" content="Wappuradioo tält puolt jokkee" />
      </Head>
      <Hero
        image={heroImage}
        title={heroTitle}
        subtext={heroSubtext}
        buttonLink={heroButtonLink}
        buttonText={heroButtonText}
        navigationItems={navigationItems}
      />
      <div className="pb-8 mx-auto pt-12 max-w-4xl text-white">{renderRichtext(content)}</div>
      <Footer navigationItems={navigationItems} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const data = await fetchContent<IndexQuery>(IndexDocument);

  const { heroImage, content, heroTitle, heroSubtext, heroButtonText, heroButtonLink } =
    data.indexCollection.items[0];

  const navigationItems = await fetchNavigationItems();

  return {
    props: {
      heroImage,
      content,
      heroTitle,
      heroSubtext,
      heroButtonText,
      heroButtonLink,
      navigationItems,
    },
  };
};

export default Index;
