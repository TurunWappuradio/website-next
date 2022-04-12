import { BsPlay, BsPause, BsVolumeUp, BsVolumeMute } from 'react-icons/bs';

interface PlayerProps {
  playing: boolean;
  onPlayPause: () => void;
  muted: boolean;
  onMute: () => void;
}

const Player = ({ playing, onPlayPause, muted, onMute }: PlayerProps) => {
  const PlayPauseIcon = playing ? BsPause : BsPlay;
  const MuteIcon = muted ? BsVolumeMute : BsVolumeUp;

  return (
    <div className="bg-blue-darkest p-8">
      <div className="mx-auto flex max-w-4xl">
        <button
          onClick={onPlayPause}
          className={`flex h-28 w-28 items-center justify-center rounded-full ${
            playing ? 'bg-coral' : 'bg-teal'
          }`}
        >
          <PlayPauseIcon size="6rem" className="mx-auto" />
        </button>
        <button
          onClick={onMute}
          className={`h-20 w-20 rounded-full ${muted ? 'bg-coral' : 'bg-teal'}`}
        >
          <MuteIcon size="3rem" className="mx-auto" />
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
