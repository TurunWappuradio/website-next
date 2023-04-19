import { useEffect, useState } from 'react';

const METADATA_URL = 'https://json.turunwappuradio.com/metadata.json';
const METADATA_REFRESH_TIME = 3000;

interface Metadata {
  song: string;
  artist: string;
}

const useMetadata = (): Metadata => {
  const [metadata, setMetadata] = useState<Metadata>({ song: '', artist: '' });

  const fetchMeta = async () => {
    const response = await fetch(METADATA_URL, {
      cache: 'no-cache',
    });

    const data = await response.json();

    // Update only if changed to avoid unnecessary re-renders
    if (data.song != metadata.song || data.artist != metadata.artist) {
      setMetadata(data);

      // show metadata in mobile media widget.
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = buildMediaMetadata(data);
      }
    }
  };

  useEffect(() => {
    fetchMeta();
    const fetcher = setInterval(fetchMeta, METADATA_REFRESH_TIME);
    return () => clearInterval(fetcher);
  }, []);

  return metadata;
};

const buildMediaMetadata = ({ song, artist }: Metadata): MediaMetadata => {
  return new MediaMetadata({
    title: song,
    artist,
    artwork: [
      {
        src: '/logo@512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/logo@310.png',
        sizes: '310x310',
        type: 'image/png',
      },
      {
        src: '/logo@192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo@152.png',
        sizes: '152x152',
        type: 'image/png',
      },
    ],
  });
};

export default useMetadata;
