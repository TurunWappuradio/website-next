import Image from 'next/image';

const SponsorImage = ({ sponsor }: { sponsor: ISponsorData }) => (
  <div className="relative m-4 h-[8rem] w-[8rem]">
    <Image
      src={sponsor.logoImage.url}
      alt={sponsor.title}
      layout="fill"
      objectFit="contain"
    />
  </div>
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
}

export default Sponsors;
