import {
  FiPlay,
  FiPause,
  FiVolumeX,
  FiVolume2,
  FiMessageSquare,
  FiVideo,
} from 'react-icons/fi';

import useShoutBoxAndVideo from 'hooks/useShoutboxAndVideo';
interface ControlsProps {
  playing: boolean;
  onPlayPause: () => void;
  muted: boolean;
  onMute: () => void;
  isSmall?: boolean;
  showChatAndVideo?: boolean;
}

const Controls = ({
  playing,
  onPlayPause,
  muted,
  onMute,
  isSmall = false,
  showChatAndVideo = false,
}: ControlsProps) => {
  const MuteIcon = muted ? FiVolumeX : FiVolume2;

  const { shoutboxOpen, setShoutboxOpen, videoOpen, setVideoOpen } =
    useShoutBoxAndVideo();

  const handleShoutboxToggle = () => {
    setShoutboxOpen(!shoutboxOpen);
  };

  const handleVideoToggle = () => {
    setVideoOpen(!videoOpen);
  };

  return (
    <div className={`flex items-center text-white`}>
      <button
        onClick={onPlayPause}
        title="Play/Pause"
        className={`flex items-center justify-center rounded-full ${
          playing ? 'bg-purple-darkest' : 'bg-orange'
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
          muted ? 'bg-purple-darkest' : 'bg-orange'
        }`}
      >
        <MuteIcon size="1.7rem" className="mx-auto" />
      </button>
      {showChatAndVideo && (
        <>
          <button
            onClick={handleShoutboxToggle}
            title="chat"
            className={`ml-3 h-12 w-12 rounded-full ${
              shoutboxOpen ? 'bg-purple-darkest' : 'bg-orange'
            }`}
          >
            <FiMessageSquare size="1.7rem" className="mx-auto" />
          </button>
          <button
            onClick={handleVideoToggle}
            title="Webcam"
            className={`ml-3 h-12 w-12 rounded-full ${
              videoOpen ? 'bg-purple-darkest' : 'bg-orange'
            }`}
          >
            <FiVideo size="1.7rem" className="mx-auto" />
          </button>
        </>
      )}
    </div>
  );
};

export default Controls;
