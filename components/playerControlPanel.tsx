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

  // Show metadata only after the lähetys starts.
  const showMeta = new Date() > new Date('2022-04-21:12:00+03:00');

  return (
    <div className="fixed bottom-0 z-50 w-full bg-blue-darkestest px-6 py-6 text-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <Controls
          playing={playing}
          onPlayPause={onPlayPause}
          muted={muted}
          onMute={onMute}
          isSmall={true}
        />

        {showMeta && (
          <div className="flex max-w-[50%] flex-col text-right lg:text-center">
            <span className="font-bold md:text-xl">{song}</span>
            <span className="text-sm opacity-80 md:text-base">{artist}</span>
          </div>
        )}

        <div className="hidden text-right lg:block">
          <span className="font-bold md:text-xl">Turun Wappuradio</span>
          <div>
            <span>Taajuudella</span> <b>93,8 MHz</b>
          </div>
          <div>
            <span>Studio</span> <b>023 619 0516</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerControlPanel;
