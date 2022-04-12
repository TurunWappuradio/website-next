import { createRef, useState } from 'react';
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

const AUDIO_STREAM_URL = 'https://player.turunwappuradio.com/wappuradio.mp3';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const audioEl = createRef<HTMLAudioElement>();
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = () => {
    console.log('click');
    if (audioEl.current.paused) audioEl.current.play();
    else {
      // Pause, but then load the stream again ready to start
      audioEl.current.pause();
      audioEl.current.src = AUDIO_STREAM_URL;
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioEl}>
        <source src={AUDIO_STREAM_URL} type="audio/mpeg" />
      </audio>
      <Component {...pageProps} onPlayPause={handlePlayPause} />
    </>
  );
};

export default MyApp;
