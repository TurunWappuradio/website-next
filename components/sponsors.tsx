import Image from 'next/image';

const testSponsors: SponsorData[] = [
  { name: 'test1', imgSrc: '/test1.jpg' },
  { name: 'test2', imgSrc: '/test1.jpg' },
  { name: 'test3', imgSrc: '/test1.jpg' },
  { name: 'test4', imgSrc: '/test1.jpg' },
  { name: 'test5', imgSrc: '/test1.jpg' },
  { name: 'test6', imgSrc: '/test1.jpg' },
  { name: 'test7', imgSrc: '/test1.jpg' },
  { name: 'test8', imgSrc: '/test1.jpg' },
  { name: 'test9', imgSrc: '/test1.jpg' },
  { name: 'test10', imgSrc: '/test1.jpg' },
  { name: 'test11', imgSrc: '/test1.jpg' },
  { name: 'test12', imgSrc: '/test1.jpg' },
];

const SponsorImage = ({ sponsor }: { sponsor: SponsorData }) => (
  <div className="m-4 h-[5rem] w-[10rem] bg-white">
    Testing sponsor
    {/*<Image src={sponsor.imgSrc} alt={sponsor.name} layout="fill" />*/}
  </div>
);

const Sponsors = ({ sponsors }: SponsorProps) => {
  const sponsorImages = sponsors || testSponsors;
  return (
    <div className="flex max-w-full flex-row justify-center bg-blue py-14">
      <div className="flex w-256 flex-wrap justify-center">
        {sponsorImages.map((s) => (
          <SponsorImage key={s.name} sponsor={s} />
        ))}
      </div>
    </div>
  );
};

type SponsorData = { name: string; imgSrc: string };

interface SponsorProps {
  sponsors?: SponsorData[];
}

export default Sponsors;
