import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import Footer from '@/components/footer';
import Hero from '@/components/hero';
import { fetchNavigationItems, NavigationItem } from '@/contentful/client';

interface MusicPageProps {
  navigationItems: NavigationItem[];
}

const MusicPage: NextPage<MusicPageProps> = ({ navigationItems }) => {
  const title = 'Musiikkikirjasto | Turun Wappuradio';
  const subtext = 'Lista biiseistä jotka löytyy valmiina musakoneesta';

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
      <h1>Hello world!</h1>
      <Footer navigationItems={navigationItems} />
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
