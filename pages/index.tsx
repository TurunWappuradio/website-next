import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';

import {
  fetchContent,
  fetchNavigationItems,
  NavigationItem,
} from 'contentful/client';
import RichText from 'components/richtext';
import Hero from 'components/hero';
import { IndexDocument, IndexQuery } from 'contentful/index.graphql';
import Footer from 'components/footer';
import Image from 'next/image';
import Calendar from 'components/calendar';

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

      {/* First section */}
      <main className="flex flex-wrap-reverse items-center justify-center py-4 md:py-8">
        <div className="relative m-10 h-48 w-128 max-w-full md:m-8 md:h-96">
          <Image
            src={firstDecorativeImage.url}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
        <section className="m-4 w-128 max-w-full text-lg text-white md:m-8">
          <RichText content={firstContent} />
        </section>
      </main>

      {/* Second section */}
      <div className="min-h-32 flex w-full flex-wrap items-center justify-center bg-blue-dark py-4 md:py-8">
        <section className="m-4 w-128 max-w-full text-base text-white md:m-8">
          <RichText content={secondContent} />
        </section>
        <Calendar />
      </div>

      {/* Third section */}
      <div className="flex flex-wrap items-center justify-center py-4 md:py-8">
        <section className="m-4 w-128 max-w-full text-base text-white md:m-8">
          <RichText content={thirdContent} />
        </section>
        <div className="relative m-10 h-48 w-128 max-w-full md:m-8 md:h-96">
          <Image
            src={secondDecorativeImage.url}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
      </div>
      <Footer navigationItems={navigationItems} />
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
