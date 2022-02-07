import { fetchContent } from "utils/contentful";

export default function Page({ content }) {
  return 'hello world';
}

export async function getStaticPaths() {
  const slugQuery = `
    query {
      contentPageCollection {
        items {
          slug
        }
      }
    }
  `;

  const slugResult = await fetchContent(slugQuery);
  console.log(slugResult);

  return {
    paths: [
      'asd',
    ],
    fallback: false
  };
}

export async function getStaticProps(slug) {

  return {
    props: {
      content: 'hello world'
    }
  };
}
