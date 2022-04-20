import useMetadata from 'hooks/useMetadata';
import Controls from './controls';

interface PlayerControlPanelProps {
  playing: boolean;
  onPlayPause: () => void;
  muted: boolean;
  onMute: () => void;
}

const PlayerControlPanel = ({
  playing,
  onPlayPause,
  muted,
  onMute,
}: PlayerControlPanelProps) => {
  const { song, artist } = useMetadata();

  return (
    <div className="fixed bottom-0 z-50 w-full bg-blue-darkest px-6 py-6 text-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <Controls
          playing={playing}
          onPlayPause={onPlayPause}
          muted={muted}
          onMute={onMute}
          isSmall={true}
        />

        <div className="flex max-w-[50%] flex-col text-right">
          <span className="font-bold md:text-xl">{song}</span>
          <span className="text-sm opacity-80 md:text-base">{artist}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerControlPanel;
