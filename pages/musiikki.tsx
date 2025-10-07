import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import Hero from '@/components/hero';
import { SongsTable } from '@/components/songsTable';
import { fetchNavigationItems, NavigationItem } from '@/contentful/client';

const title = 'Musiikkikirjasto | Turun Wappuradio';
const subtext = 'Lista biiseistä jotka löytyy valmiina musakoneesta';

interface MusicPageProps {
  navigationItems: NavigationItem[];
}

const MusicPage: NextPage<MusicPageProps> = ({ navigationItems }) => {
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="description" content={subtext} />
        <meta name="og:description" content={subtext} />
        <meta name="twitter:description" content={subtext} />
      </Head>
      <Hero
        title="Musiikkikirjasto"
        subtext={subtext}
        navigationItems={navigationItems}
        isCompact={true}
      />
      <article className="mx-auto pt-12 text-white">
        <h1 className="mx-auto px-3 max-w-6xl my-4 text-3xl font-bold text-radio-accent200">
          Biisit
        </h1>
        <SongsTable />
      </article>
    </div>
  );
};

export const getStaticProps: GetStaticProps<MusicPageProps> = async () => {
  const navigationItems = await fetchNavigationItems();

  return {
    props: {
      navigationItems,
    },
  };
};

export default MusicPage;
