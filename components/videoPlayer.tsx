import useShoutBoxAndVideo from 'hooks/useShoutboxAndVideo';
import { GrFormClose } from 'react-icons/gr';

const VideoPlayer = () => {
  const { videoOpen, setVideoOpen } = useShoutBoxAndVideo();

  const handleClose = () => {
    setVideoOpen(false);
  };

  return (
    videoOpen && (
      <div className="mx-auto block w-full max-w-6xl">
        <div className="flex w-full items-end justify-end text-coral">
          <button
            onClick={handleClose}
            title="chat"
            className="mr-5 mt-5 h-10 w-10 rounded-full bg-coral"
          >
            <GrFormClose size="1.7rem" className="mx-auto" />
          </button>
        </div>

        <div className="h-96 py-6 px-[25px] md:h-[38rem]">
          <iframe
            /** Add parent &parent=localhost if testing */
            src="https://player.twitch.tv/?channel=turunwappuradio&parent=www.turunwappuradio.com&parent=turunwappuradio.com&muted=true"
            height="100%"
            width="100%"
            allowFullScreen={true}
          />
        </div>
      </div>
    )
  );
};

export default VideoPlayer;
