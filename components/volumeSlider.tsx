interface VolumeSliderProps {
  volume: number;
  onVolumeChange: (value: number) => void;
  muted: boolean;
}

const VolumeSlider = ({ volume, onVolumeChange, muted }: VolumeSliderProps) => {
  // IOS does not allow changing volume with JavaScript so let's hide the slider altogether
  if (['iPad', 'iPhone', 'iPod'].includes(navigator?.platform)) {
    return null;
  }

  return (
    <input
      aria-label="volume"
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={(event) => onVolumeChange(Number(event.target.value))}
      className={`transparent h-1 w-[6.66rem] appearance-none rounded-lg
          ${
            muted
              ? 'bg-radio-secondary [&::-moz-range-thumb]:bg-radio-secondary [&::-webkit-slider-thumb]:bg-radio-secondary'
              : 'bg-radio-accent [&::-moz-range-thumb]:bg-radio-accent [&::-webkit-slider-thumb]:bg-radio-accent'
          }
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none
          [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none
`}
    />
  );
};

export default VolumeSlider;
