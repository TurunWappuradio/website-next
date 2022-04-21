import useMetadata from 'hooks/useMetadata';
import { useState } from 'react';
import { FiMessageSquare, FiVideo } from 'react-icons/fi';
import Controls from './controls';
import Chat from './ShoutBox/shoutbox';

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
  const [chatOpen, setChatOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const { song, artist } = useMetadata();

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const handleVideoToggle = () => {
    setVideoOpen(!videoOpen);
  };

  // Show metadata only after the lähetys starts.
  const showMeta = new Date() > new Date('2022-04-21:12:00+03:00');

  return (
    <div className="fixed bottom-0 z-50 w-full">
      <div
        className={`bg-blue-darkest md:flex md:px-32 ${
          chatOpen || videoOpen ? 'block' : 'hidden'
        }`}
      >
        <div className={`w-full ${chatOpen ? 'block' : 'hidden'}`}>
          <Chat limit={100} isOpen={true} />
        </div>
        <div
          className={`h-96 w-full bg-blue-darkest md:h-[36rem] ${
            videoOpen ? 'block' : 'hidden'
          }`}
        >
          <iframe
            /** Add parent &parent=localhost if testing */
            src="https://player.twitch.tv/?channel=turunwappuradio&parent=www.turunwappuradio.com&parent=turunwappuradio.com&muted=true"
            height="100%"
            width="100%"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
      <div className="bg-blue-darkestest px-4 text-white md:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center py-6">
            <Controls
              playing={playing}
              onPlayPause={onPlayPause}
              muted={muted}
              onMute={onMute}
              isSmall={true}
            />
            <div className="ml-6">
              <button
                onClick={handleChatToggle}
                title="Shoutbox"
                className={`ml-3 h-12 w-12 rounded-full ${
                  chatOpen ? 'bg-teal' : 'bg-coral'
                }`}
              >
                <FiMessageSquare size="1.7rem" className="mx-auto" />
              </button>

              <button
                onClick={handleVideoToggle}
                title="Webcam"
                className={`ml-3 h-12 w-12 rounded-full ${
                  videoOpen ? 'bg-teal' : 'bg-coral'
                }`}
              >
                <FiVideo size="1.7rem" className="mx-auto" />
              </button>
            </div>
          </div>

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
    </div>
  );
};

export default PlayerControlPanel;
