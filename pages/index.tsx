import Head from 'next/head';
import { gql } from '@apollo/client';

import { renderRichtext } from 'utils/richtext';
import { fetchContent } from 'utils/contentful';
import Hero from 'components/hero';

export default function Index({
  content,
  heroImage,
  heroTitle,
  heroSubtext,
  heroButtonText,
  heroButtonLink,
}: any) {
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
}

export async function getStaticProps() {
  const indexQuery = gql`
    query IndexQuery {
      indexCollection(limit: 1) {
        items {
          heroImage {
            url
          }
          heroTitle
          heroSubtext
          heroButtonText
          heroButtonLink
          content {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  width
                  height
                  description
                  contentType
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchContent(indexQuery);

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
}
