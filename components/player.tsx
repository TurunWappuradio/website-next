import useMetadata from 'hooks/useMetadata';
import { BsPlay, BsPause, BsVolumeUp, BsVolumeMute } from 'react-icons/bs';

interface PlayerProps {
  playing: boolean;
  onPlayPause: () => void;
  muted: boolean;
  onMute: () => void;
}

const Player = ({ playing, onPlayPause, muted, onMute }: PlayerProps) => {
  const MuteIcon = muted ? BsVolumeMute : BsVolumeUp;

  const { song, artist } = useMetadata();

  return (
    <div className="bg-blue-darkest p-8">
      <div className="mx-auto flex max-w-4xl">
        <button
          onClick={onPlayPause}
          className={`flex h-28 w-28 items-center justify-center rounded-full ${
            playing ? 'bg-coral' : 'bg-teal'
          }`}
        >
          {playing ? (
            <BsPause size="6rem" />
          ) : (
            <BsPlay size="6rem" className="ml-2" />
          )}
        </button>
        <button
          onClick={onMute}
          className={`ml-4 h-20 w-20 rounded-full ${
            muted ? 'bg-coral' : 'bg-teal'
          }`}
        >
          <MuteIcon size="3rem" className="mx-auto" />
        </button>
        <div className="ml-4 flex flex-col">
          <span className="text-white">Nyt soi</span>
          <span className="text-coral">{song}</span>
          <span className="text-coral opacity-60">{artist}</span>
        </div>
      </div>
    </div>
  );
};

export default Player;
