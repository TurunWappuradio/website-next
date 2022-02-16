import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';

import { fetchContent, fetchNavigationItems, NavigationItem } from 'contentful/client';
import RichText from 'components/richtext';
import Hero from 'components/hero';
import { IndexDocument, IndexQuery } from 'contentful/index.graphql';
import Image from 'next/image';

interface IndexProps {
  heroImage: {
    url?: string;
  };
  heroTitle: string;
  heroSubtext: string;
  heroButtonText: string;
  heroButtonLink: string;
  navigationItems: NavigationItem[];
  firstDecorativeImage: {
    url?: string;
    width?: number;
    height?: number;
  };
  secondDecorativeImage: {
    url?: string;
  };
  firstContent: any;
  secondContent: any;
  thirdContent: any;
}

const Index: NextPage<IndexProps> = ({
  heroImage,
  heroTitle,
  heroSubtext,
  heroButtonText,
  heroButtonLink,
  navigationItems,
  firstDecorativeImage,
  secondDecorativeImage,
  firstContent,
  secondContent,
  thirdContent,
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
      <main className="flex justify-center items-center flex-wrap-reverse">
        <div className="relative h-48 md:h-96 w-128 m-10 max-w-full">
          <Image
            src={firstDecorativeImage.url}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
        <section className="text-white text-lg w-128 m-6 max-w-full">
          <RichText content={firstContent} />
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const data = await fetchContent<IndexQuery>(IndexDocument);

  const {
    heroImage,
    heroTitle,
    heroSubtext,
    heroButtonText,
    heroButtonLink,
    firstDecorativeImage,
    secondDecorativeImage,
    firstContent,
    secondContent,
    thirdContent,
  } = data.indexCollection.items[0];

  const navigationItems = await fetchNavigationItems();

  return {
    props: {
      heroImage,
      heroTitle,
      heroSubtext,
      heroButtonText,
      heroButtonLink,
      navigationItems,
      firstDecorativeImage,
      secondDecorativeImage,
      firstContent,
      secondContent,
      thirdContent,
    },
  };
};

export default Index;
