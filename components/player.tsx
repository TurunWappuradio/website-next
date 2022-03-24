import { BsPlay } from 'react-icons/bs'

const Player = () => {
  return <div className="bg-blue-darkest p-8">
    <div className="mx-auto max-w-4xl flex">
      <button className="h-28 w-28 bg-coral rounded-full flex justify-center items-center">
        <BsPlay size="6rem" className="mx-auto" />
      </button>
      <div className="flex flex-col">
        <span className="text-white">Nyt soi</span>
        <span className="text-coral">Funny Funk</span>
        <span className="text-coral">Jussi Halme</span>
      </div>
    </div>
  </div>;
};

export default Player;
