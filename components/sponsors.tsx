import Image from 'next/image';

const SponsorImage = ({ sponsor }: { sponsor: ISponsorData }) => (
  <a href={sponsor.link} target="_blank" rel="noreferrer">
    <div className="grid h-full content-center">
      <div className="mx-6 my-4 max-w-[200px]">
        {/*       <Image
        src={sponsor.logoImage.url}
        alt={sponsor.title}
        layout="fill"
        objectFit="contain"
        quality={100}
        className={sponsor.isRoundedBorders ? 'rounded-[4px]' : undefined}
      /> */}
        <img
          src={sponsor.logoImage.url}
          alt={sponsor.title}
          style={{
            maxHeight: '90px',
            width: 'auto',
            borderRadius: sponsor.isRoundedBorders ? '4px' : null,
          }}
        />
      </div>
    </div>
  </a>
);

const Sponsors = ({ sponsors = [] }: SponsorProps) => (
  <div className="flex max-w-full flex-row justify-center bg-blue py-14">
    <div className="flex w-256 flex-wrap justify-center">
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
