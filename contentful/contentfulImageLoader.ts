const contentfulImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
}) => {
  return `${src}?q=${quality || 100}&w=${width}&fm=webp`;
};

export { contentfulImageLoader };
