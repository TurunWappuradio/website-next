import { FiPause, FiPlay, FiVolume2, FiVolumeX } from 'react-icons/fi';

import VolumeSlider from './volumeSlider';

interface ControlsProps {
  playing: boolean;
  onPlayPause: () => void;
  muted: boolean;
  onMute: () => void;
  volume: number;
  onVolumeChange: (value: number) => void;
}

const Controls = ({
  playing,
  onPlayPause,
  muted,
  onMute,
  volume,
  onVolumeChange,
}: ControlsProps) => {
  const MuteIcon = muted ? FiVolumeX : FiVolume2;

  return (
    <div className="mb-3 flex w-full flex-wrap items-center gap-x-3 gap-y-6 sm:mb-0">
      <button
        onClick={onPlayPause}
        title="Play/Pause"
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          playing ? 'bg-teal' : 'bg-coral'
        }`}
      >
        {playing ? (
          <FiPause size="1.7rem" />
        ) : (
          <FiPlay size="1.7rem" className="ml-1" />
        )}
      </button>

      <button
        onClick={onMute}
        title="Mute"
        className={`h-12 w-12 rounded-full ${muted ? 'bg-teal' : 'bg-coral'}`}
      >
        <MuteIcon size="1.7rem" className="mx-auto" />
      </button>

      <VolumeSlider
        volume={volume}
        onVolumeChange={onVolumeChange}
        muted={muted}
      />
    </div>
  );
};

export default Controls;
