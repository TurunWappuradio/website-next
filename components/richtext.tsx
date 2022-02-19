import React, { FC } from 'react';
import { MARKS, BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';

import { imageLoader } from '../contentful/imageLoader';
import { LinkButton } from './button';

const renderOptions = (links?: any): Options => {
  // create an asset map
  const assetMap = new Map();

  if (links) {
    // loop through the linked assets and add them to a map
    for (const asset of links.assets.block) {
      assetMap.set(asset.sys.id, asset);
    }
  }

  return {
    renderText: (text) => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
    renderMark: {
      [MARKS.BOLD]: (text) => <strong className="font-bold">{text}</strong>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="m-3">{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => (
        <p className="text-3xl mx-3 my-4 font-bold text-coral">{children}</p>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-3xl m-3 font-bold text-coral">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-2xl m-3 font-bold text-coral">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className="text-xl m-3 font-bold text-coral">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className="text-lg m-3 font-bold text-coral">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className="text-lg m-3 font-bold text-coral">{children}</h6>
      ),
      [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc ml-8">{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal ml-8">{children}</ol>,
      [INLINES.HYPERLINK]: ({ data }, children) => {
        /* This is a hack.
         * If children are underlined, render the link as button.
         * TODO: find a better way to make a button with Contentful.
         */
        if (React.Children.map(children, (child: any) => child?.type === 'u').every(Boolean)) {
          return (
            <span className="w-full flex justify-end">
              <LinkButton href={data.uri}>
                {React.Children.map(children, (child: any) =>
                  React.cloneElement(child, {
                    className: 'no-underline',
                  })
                )}
              </LinkButton>
            </span>
          );
        }

        return (
          <a href={data.uri} className="font-bold text-coral underline">
            {children}
          </a>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = assetMap.get(node.data.target.sys.id);

        return (
          <div className="relative md:p-4">
            <Image
              src={asset.url}
              loader={imageLoader}
              sizes="900px" // tailwind max-w-4xl
              width={asset.width}
              height={asset.height}
              alt={asset.description}
              layout="responsive"
              className="md:rounded"
            />
          </div>
        );
      },
    },
  };
};

interface RichTextProps {
  content: any;
}

const RichText: FC<RichTextProps> = ({ content }: RichTextProps) => {
  const { json, links } = content;

  return (
    <div className="flex flex-col">{documentToReactComponents(json, renderOptions(links))}</div>
  );
};

export default RichText;
