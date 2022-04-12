import { BsPlay, BsPause } from 'react-icons/bs';

interface PlayerProps {
  playing: boolean;
  onPlayPause: () => void;
}

const Player = ({ playing, onPlayPause }: PlayerProps) => {
  const Icon = playing ? BsPause : BsPlay;

  return (
    <div className="bg-blue-darkest p-8">
      <div className="mx-auto flex max-w-4xl">
        <button
          onClick={onPlayPause}
          className="flex h-28 w-28 items-center justify-center rounded-full bg-coral"
        >
          <Icon size="6rem" className="mx-auto" />
        </button>
        <div className="flex flex-col">
          <span className="text-white">Nyt soi</span>
          <span className="text-coral">Funny Funk</span>
          <span className="text-coral">Jussi Halme</span>
        </div>
      </div>
    </div>
  );
};

export default Player;
