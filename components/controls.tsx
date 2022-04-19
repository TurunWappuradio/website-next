import { BsPause, BsPlay, BsVolumeMute, BsVolumeUp } from 'react-icons/bs';

interface ControlsProps {
  playing: boolean;
  onPlayPause: () => void;
  muted: boolean;
  onMute: () => void;
}

const Controls = ({ playing, onPlayPause, muted, onMute }: ControlsProps) => {
  const MuteIcon = muted ? BsVolumeMute : BsVolumeUp;

  return (
    <div className="mt-4 flex items-center">
      <button
        onClick={onPlayPause}
        className={`flex h-28 w-28 items-center justify-center rounded-full ${
          playing ? 'bg-teal' : 'bg-coral'
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
          muted ? 'bg-teal' : 'bg-coral'
        }`}
      >
        <MuteIcon size="3rem" className="mx-auto" />
      </button>
    </div>
  );
};

export default Controls;
