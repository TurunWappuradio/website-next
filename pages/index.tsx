import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Calendar from '@/components/calendar';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import Player from '@/components/player';
import RichText from '@/components/richtext';
import { Showlist } from '@/components/showlist';
import Sponsors, { ISponsorData } from '@/components/sponsors';
import {
  fetchContent,
  fetchNavigationItems,
  NavigationItem,
} from '@/contentful/client';
import { contentfulImageLoader } from '@/contentful/contentfulImageLoader';
import { IndexDocument, IndexQuery } from '@/gql/graphql';
import { fetchShowlist } from '@/scripts/google/client';
import { ShowsByDate } from '@/scripts/google/showlistHelpers';

const isPlayerLive = process.env.NEXT_PUBLIC_PLAYER_MODE === 'live';

// !!!
// Hox! Lähetyksen aikana käytettävä sisältö seuraa soittimen tilaa (live/offseason).
// !!!
interface IndexProps {
  heroImage: {
    url?: string;
  };
  heroTitle: string;
  heroSubtext: string;
  heroButtonText: string;
  heroButtonLink: string;
  navigationItems: NavigationItem[];
  showsByDate?: ShowsByDate;
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
  sponsors,

  // Offseason content
  firstDecorativeImage,
  secondDecorativeImage,
  firstContent,
  secondContent,
  thirdContent,

  // Live content
  showsByDate,
  playing,
  onPlayPause,
  muted,
  onMute,
}) => {
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>{heroTitle}</title>
        <meta name="og:title" content={heroTitle} />
        <meta name="twitter:title" content={heroTitle} />

        <meta name="description" content={heroSubtext} />
        <meta name="og:description" content={heroSubtext} />
        <meta name="twitter:description" content={heroSubtext} />
      </Head>
      <Hero
        image={heroImage}
        title={heroTitle}
        subtext={heroSubtext}
        buttonLink={heroButtonLink}
        buttonText={heroButtonText}
        navigationItems={navigationItems}
        isCompact={true}
      />
      {isPlayerLive ? (
        <>
          <Player
            playing={playing}
            onPlayPause={onPlayPause}
            muted={muted}
            onMute={onMute}
            showsByDate={showsByDate}
          />
          {showsByDate && <Showlist showsByDate={showsByDate} />}
        </>
      ) : (
        <>
          {/* Pienkeräys */}
          <section className="flex justify-center px-6 py-16 md:py-24">
            <div className="bg-radio-promote max-w-3xl rounded-2xl relative overflow-visible flex flex-col md:flex-row">
              <div className="md:w-1/4 m-2 shrink-0">
                <Image
                  src="/pienkerays_dino.svg"
                  className="w-full max-w-[200px] block -mt-[50px] md:-mt-[70px]"
                  alt=""
                  width={400}
                  height={400}
                />
              </div>
              <div className="p-5 flex-grow">
                <h2 className="text-2xl font-bold mb-4">
                  Pienkeräys Turun Wappuradion tueksi
                </h2>
                <p className="mb-4 text-lg font-semibold">
                  Turun Wappuradiota kohdannut vastoinkäymisten radioaallokko ei
                  kaatanut venettä, mutta kaipaisimme tukea eteenpäin
                  seilaamiseen.
                </p>
                <div className="text-right font-bold text-lg underline">
                  <Link href="/pienkerays">Lue lisää pienkeräyksestä →</Link>
                </div>
              </div>
            </div>
          </section>
          {/* End of Pienkeräys */}

          <main className="flex flex-wrap-reverse items-center justify-center py-4 md:py-8">
            <div className="relative m-10 h-48 w-lg max-w-full md:m-8 md:h-96">
              <Image
                src={firstDecorativeImage?.url}
                loader={contentfulImageLoader}
                className="rounded"
                alt=""
                fill
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <section className="m-4 w-lg max-w-full text-lg text-white md:m-8">
              <RichText content={firstContent} />
            </section>
          </main>

          <div className="min-h-32 flex w-full flex-wrap items-center justify-center bg-radio-bg200 py-4 md:py-8">
            <section className="m-4 w-lg max-w-full text-base text-white md:m-8">
              <RichText content={secondContent} />
            </section>
            <Calendar />
          </div>

          <div className="flex flex-wrap items-center justify-center py-4 md:py-8">
            <section className="m-4 w-lg max-w-full text-base text-white md:m-8">
              <RichText content={thirdContent} />
            </section>
            <div className="relative m-10 h-48 w-lg max-w-full md:m-8 md:h-96">
              <Image
                src={secondDecorativeImage?.url}
                loader={contentfulImageLoader}
                className="rounded"
                alt=""
                fill
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </>
      )}
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

  // Live content
  const showsByDate: ShowsByDate | undefined = isPlayerLive
    ? await fetchShowlist()
    : undefined;

  const props = {
    heroImage,
    heroTitle,
    heroSubtext,
    heroButtonText,
    heroButtonLink,
    navigationItems,
    showsByDate: showsByDate || null,
    firstDecorativeImage,
    secondDecorativeImage,
    firstContent,
    secondContent,
    thirdContent,
    sponsors,
  };

  return { props };
};

export default Index;
