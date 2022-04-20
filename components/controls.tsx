import { FiPlay, FiPause, FiVolumeX, FiVolume2 } from 'react-icons/fi';

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
  const MuteIcon = muted ? FiVolumeX : FiVolume2;

  return (
    <div className="mt-4 flex items-center text-white">
      <button
        onClick={onPlayPause}
        title="Play/Pause"
        className={`flex items-center justify-center rounded-full ${
          playing ? 'bg-teal' : 'bg-coral'
        } ${isSmall ? 'h-12 w-12' : 'h-20 w-20'}`}
      >
        {playing ? (
          <FiPause size={isSmall ? '1.7rem' : '3rem'} />
        ) : (
          <FiPlay
            size={isSmall ? '1.7rem' : '3rem'}
            className={isSmall ? 'ml-1' : 'ml-2'}
          />
        )}
      </button>
      <button
        onClick={onMute}
        title="Mute"
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
