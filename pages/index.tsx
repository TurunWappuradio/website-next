import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';

import {
  fetchContent,
  fetchNavigationItems,
  fetchShowlist,
  NavigationItem,
  Show,
} from 'contentful/client';
// import { contentfulImageLoader } from 'contentful/contentfulImageLoader';
// import RichText from 'components/richtext';
import Hero from 'components/hero';
import { IndexDocument, IndexQuery } from 'contentful/graphql/index.graphql';
import Footer from 'components/footer';
// import Image from 'next/image';
// import Calendar from 'components/calendar';
import Sponsors, { ISponsorData } from 'components/sponsors';
import { Showlist } from 'components/showlist';
import Player from 'components/player';
import Chat from 'components/ShoutBox/shoutbox';

const isPlayerLive = process.env.NEXT_PUBLIC_PLAYER_MODE === 'live';

interface IndexProps {
  heroImage: {
    url?: string;
  };
  heroTitle: string;
  heroSubtext: string;
  heroButtonText: string;
  heroButtonLink: string;
  navigationItems: NavigationItem[];

  showsByDate: Record<string, Show[]>;
  weekKeys: Record<string, string[]>;
  // firstDecorativeImage: {
  //   url?: string;
  //   width?: number;
  //   height?: number;
  // };
  // secondDecorativeImage: {
  //   url?: string;
  // };
  // firstContent: any;
  // secondContent: any;
  // thirdContent: any;
  sponsors: ISponsorData[];
}

interface PlayerControls {
  playing: boolean;
  onPlayPause: () => void;
  muted: boolean;
  onMute: () => void;
}

const Index: NextPage<IndexProps & PlayerControls> = ({
  heroImage,
  heroTitle,
  heroSubtext,
  heroButtonText,
  heroButtonLink,
  navigationItems,
  showsByDate,
  weekKeys,
  // firstDecorativeImage,
  // secondDecorativeImage,
  // firstContent,
  // secondContent,
  // thirdContent,
  sponsors,
  playing,
  onPlayPause,
  muted,
  onMute,
}) => {
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>{heroTitle}</title>
        <meta name="description" content={heroSubtext} />
      </Head>
      <Hero
        image={heroImage}
        title={heroTitle}
        subtext={heroSubtext}
        buttonLink={heroButtonLink}
        buttonText={heroButtonText}
        navigationItems={navigationItems}
        isCompact={isPlayerLive}
      />
      {isPlayerLive && (
        <Player
          playing={playing}
          onPlayPause={onPlayPause}
          muted={muted}
          onMute={onMute}
          showsByDate={showsByDate}
        />
      )}
      <Chat limit={200} isOpen={true} />

      <Showlist showsByDate={showsByDate} weekKeys={weekKeys} />

      {/* First section */}
      {/* <main className="flex flex-wrap-reverse items-center justify-center py-4 md:py-8">
        <div className="relative m-10 h-48 w-128 max-w-full md:m-8 md:h-96">
          <Image
            src={firstDecorativeImage.url}
            loader={contentfulImageLoader}
            layout="fill"
            objectFit="cover"
            className="rounded"
            alt=""
          />
        </div>
        <section className="m-4 w-128 max-w-full text-lg text-white md:m-8">
          <RichText content={firstContent} />
        </section>
      </main> */}

      {/* Second section */}
      {/* <div className="min-h-32 flex w-full flex-wrap items-center justify-center bg-blue-dark py-4 md:py-8">
        <section className="m-4 w-128 max-w-full text-base text-white md:m-8">
          <RichText content={secondContent} />
        </section>
        <Calendar />
      </div> */}

      {/* Third section */}
      {/* <div className="flex flex-wrap items-center justify-center py-4 md:py-8">
        <section className="m-4 w-128 max-w-full text-base text-white md:m-8">
          <RichText content={thirdContent} />
        </section>
        <div className="relative m-10 h-48 w-128 max-w-full md:m-8 md:h-96">
          <Image
            src={secondDecorativeImage.url}
            loader={contentfulImageLoader}
            layout="fill"
            objectFit="cover"
            className="rounded"
            alt=""
          />
        </div>
      </div> */}
      <Sponsors sponsors={sponsors} />
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

  const sponsors = data.sponsorsCollection.items[0].sponsorsCollection.items;

  const navigationItems = await fetchNavigationItems();

  const { showsByDate, weekKeys } = await fetchShowlist('wappuradio2022');

  return {
    props: {
      heroImage,
      heroTitle,
      heroSubtext,
      heroButtonText,
      heroButtonLink,
      navigationItems,
      showsByDate,
      weekKeys,
      // firstDecorativeImage,
      // secondDecorativeImage,
      // firstContent,
      // secondContent,
      // thirdContent,
      sponsors,
    },
  };
};

export default Index;
