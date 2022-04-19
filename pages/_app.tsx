import { createRef, useState } from 'react';
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

const AUDIO_STREAM_URL = 'https://player.turunwappuradio.com/wappuradio.mp3';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const audioEl = createRef<HTMLAudioElement>();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);

  const handlePlayPause = () => {
    setPlayClicked(true);

    if (audioEl.current.paused) audioEl.current.play();
    else {
      // Pause, but then load the stream again ready to start
      audioEl.current.pause();
      audioEl.current.src = AUDIO_STREAM_URL;
    }
    setPlaying(!playing);
  };

  const handleMute = () => {
    setMuted(!muted);
    audioEl.current.muted = !audioEl.current.muted;
  };

  return (
    <>
      <audio ref={audioEl}>
        <source src={AUDIO_STREAM_URL} type="audio/mpeg" />
      </audio>
      <Component
        {...pageProps}
        playing={playing}
        onPlayPause={handlePlayPause}
        muted={muted}
        onMute={handleMute}
        playClicked={playClicked}
      />
    </>
  );
};

export default MyApp;
