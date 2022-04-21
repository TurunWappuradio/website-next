import useShoutBox from 'hooks/useShoutbox';
import {
  FiPlay,
  FiPause,
  FiVolumeX,
  FiVolume2,
  FiMessageSquare,
} from 'react-icons/fi';

interface ControlsProps {
  playing: boolean;
  onPlayPause: () => void;
  muted: boolean;
  onMute: () => void;
  isSmall?: boolean;
  showChat?: boolean;
}

const Controls = ({
  playing,
  onPlayPause,
  muted,
  onMute,
  isSmall = false,
  showChat = false,
}: ControlsProps) => {
  const MuteIcon = muted ? FiVolumeX : FiVolume2;
  const [chatOpen, setChatOpen] = useShoutBox();

  return (
    <div className={`flex items-center text-white`}>
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
        className={`h-12 w-12 rounded-full ${isSmall ? 'ml-3' : 'ml-4'} ${
          muted ? 'bg-teal' : 'bg-coral'
        }`}
      >
        <MuteIcon size="1.7rem" className="mx-auto" />
      </button>
      {showChat && (
        <button
          onClick={() => setChatOpen(!chatOpen)}
          title="chat"
          className={`ml-3 h-12 w-12 rounded-full ${
            chatOpen ? 'bg-teal' : 'bg-coral'
          }`}
        >
          <FiMessageSquare size="1.7rem" className="mx-auto" />
        </button>
      )}
    </div>
  );
};

export default Controls;
