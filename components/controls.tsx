import { BsPause, BsPlay, BsVolumeMute, BsVolumeUp } from 'react-icons/bs';

interface ControlsProps {
  playing: boolean;
  onPlayPause: () => void;
  muted: boolean;
  onMute: () => void;
  isSmall?: boolean;
}

const Controls = ({
  playing,
  onPlayPause,
  muted,
  onMute,
  isSmall = false,
}: ControlsProps) => {
  const MuteIcon = muted ? BsVolumeMute : BsVolumeUp;

  return (
    <div className="mt-4 flex items-center text-white">
      <button
        onClick={onPlayPause}
        className={`flex items-center justify-center rounded-full ${
          playing ? 'bg-teal' : 'bg-coral'
        } ${isSmall ? 'h-12 w-12' : 'h-20 w-20'}`}
      >
        {playing ? (
          <BsPause size="6rem" />
        ) : (
          <BsPlay size="6rem" className="ml-2" />
        )}
      </button>
      <button
        onClick={onMute}
        className={`ml-4 h-12 w-12 rounded-full ${
          muted ? 'bg-teal' : 'bg-coral'
        }`}
      >
        <MuteIcon size="1.7rem" className="mx-auto" />
      </button>
    </div>
  );
};

export default Controls;
