import { MARKS, BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <strong className="font-bold text-teal">{text}</strong>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="m-3">{children}</p>,
    [BLOCKS.HEADING_1]: (node, children) => <h1 className="text-4xl m-3 font-bold text-coral">{children}</h1>,
    [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-3xl m-3 font-bold text-coral">{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-2xl m-3 font-bold text-coral">{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4 className="text-xl m-3 font-bold text-coral">{children}</h4>,
    [BLOCKS.HEADING_5]: (node, children) => <h5 className="text-lg m-3 font-bold text-coral">{children}</h5>,
    [BLOCKS.HEADING_6]: (node, children) => <h6 className="text-lg m-3 font-bold text-coral">{children}</h6>,
    [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc ml-8">{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal ml-8">{children}</ol>,
    [INLINES.HYPERLINK]: ({ data }, children) => (
      <a href={data.uri} className="text-coral underline">
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { url, width, height } = node.data.target;

      return (
        <div className="relative w-xl rounded p-4">
          <Image src={url} width={width} height={height} className="rounded" />
        </div>
      );
    }
  }
};

function RichText({ content }) {
  const { json, links } = content;

  // This bullshit could be avoided if we used Contentful SDK, which doesn't support GraphQL.
  const contentWithLinks = json.content.map(
    (node) => {
      if (node.nodeType == 'embedded-asset-block') {
        const asset = links.assets.block.find(
          (asset) => asset.sys.id == node.data.target.sys.id
        );
        node.data.target = asset;
      }
      return node;
    }
  );

  const jsonWithLinks = {
    ...json,
    content: contentWithLinks,
  };

  return documentToReactComponents(jsonWithLinks, options);
}

export default RichText;