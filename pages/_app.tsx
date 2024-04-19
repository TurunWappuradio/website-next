import 'tailwindcss/tailwind.css';
import { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { AppProps } from 'next/app';
import Hls from 'hls.js';

import PlayerControlPanel from '@/components/playerControlPanel';
import { ChatWrapper } from '@/components/ShoutBox/shoutbox';
import VideoPlayer from '@/components/videoPlayer';
import { ShoutBoxAndVideoProvider } from '@/hooks/useShoutboxAndVideo';

const isHlsLive = process.env.NEXT_PUBLIC_HLS_MODE === 'live';

const AUDIO_STREAM_URL = 'https://player.turunwappuradio.com/wappuradio.mp3';
const HLS_STREAM_URL = 'https://stream.turunwappuradio.com/twr_chunklist.m3u8';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const audioEl = createRef<HTMLAudioElement>();
  const hls = useRef<Hls | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [playClicked, setPlayClicked] = useState(false);

  const loadAudioStream = useCallback(() => {
    if (Hls.isSupported() && isHlsLive) {
      hls.current = new Hls();
      hls.current.loadSource(HLS_STREAM_URL);
      hls.current.attachMedia(audioEl.current);
    } else if (
      audioEl.current &&
      audioEl.current.canPlayType('application/vnd.apple.mpegurl')
    ) {
      audioEl.current.src = AUDIO_STREAM_URL;
    }
  }, [audioEl]);

  // Load the stream on initial page load.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadAudioStream, []);

  const handlePlayPause = () => {
    setPlayClicked(true);

    if (audioEl.current.paused) audioEl.current.play();
    else {
      // Pause, but then load the stream again ready to start
      audioEl.current.pause();
      loadAudioStream();
    }
    setPlaying(!playing);
  };

  const handleMute = () => {
    setMuted(!muted);
    audioEl.current.muted = !muted;
  };

  const handleSetVolume = (value: number) => {
    const newVolume = Math.min(value, 1);
    setVolume(newVolume);
    audioEl.current.volume = newVolume;
  };

  return (
    <ShoutBoxAndVideoProvider>
      <audio ref={audioEl}></audio>
      <Component
        {...pageProps}
        playing={playing}
        onPlayPause={handlePlayPause}
      />
      <div className="fixed bottom-0 z-50 w-full">
        <div className="flex flex-col bg-blue-darkest md:flex-row">
          <VideoPlayer />
          <ChatWrapper />
        </div>

        {playClicked && (
          <PlayerControlPanel
            playing={playing}
            onPlayPause={handlePlayPause}
            muted={muted}
            onMute={handleMute}
            volume={volume}
            onVolumeChange={handleSetVolume}
          />
        )}
      </div>
    </ShoutBoxAndVideoProvider>
  );
};

export default MyApp;
