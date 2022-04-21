import ContentWrapper from './ContentWrapper';

const SponsorImage = ({ sponsor }: { sponsor: ISponsorData }) => {
  const { link, logoImage, title, isRoundedBorders } = sponsor;

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="transition hover:scale-110"
    >
      <div className="grid h-full content-center">
        <div className="mx-6 my-4 max-w-[200px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoImage.url}
            alt={title}
            className={`max-h-24 w-auto ${isRoundedBorders ? 'rounded' : ''}`}
          />
        </div>
      </div>
    </a>
  );
};

const Sponsors = ({ sponsors = [] }: SponsorProps) => (
  <div className="flex max-w-full flex-col items-center bg-blue pb-14 pt-4">
    <ContentWrapper>
      <h2 className="w-full text-center text-2xl font-bold text-coral md:text-left">
        Turun Wappuradion tukena
      </h2>
      <div className="grid place-content-around gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sponsors.map((s) => (
          <div key={s.title} className="flex justify-center">
            <SponsorImage sponsor={s} />
          </div>
        ))}
      </div>
    </ContentWrapper>
  </div>
);

interface SponsorProps {
  sponsors?: ISponsorData[];
}

export interface ISponsorData {
  title?: string;
  link?: string;
  logoImage?: {
    url?: string;
  };
  isRoundedBorders?: boolean;
}

export default Sponsors;
