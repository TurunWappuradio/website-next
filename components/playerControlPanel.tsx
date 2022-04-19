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
    <div className="fixed bottom-0 z-50 w-full bg-blue-darkest px-6 text-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <Controls
          playing={playing}
          onPlayPause={onPlayPause}
          muted={muted}
          onMute={onMute}
        />

        <div className="flex flex-col text-right">
          <span>Nyt soi</span>
          <span className="text-xl font-bold text-coral">{song}</span>
          <span className="text-coral">{artist}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerControlPanel;
