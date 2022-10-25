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
  /*   <div className="flex max-w-full flex-col items-center bg-blue pb-14 pt-4"> */
  <div className="flex max-w-full flex-col items-center bg-purple-light pb-14 pt-4">
    <h2 className="w-full max-w-5xl px-8 py-4 text-2xl font-bold text-greyish">
      Turun Wappuradion tukena
    </h2>
    <div className="flex w-full max-w-5xl flex-wrap justify-center">
      {sponsors.map((s) => (
        <SponsorImage key={s.title} sponsor={s} />
      ))}
    </div>
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
