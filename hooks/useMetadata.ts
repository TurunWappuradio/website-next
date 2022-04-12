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
    }
  };

  useEffect(() => {
    fetchMeta();
    const fetcher = setInterval(fetchMeta, METADATA_REFRESH_TIME);
    return () => clearInterval(fetcher);
  }, []);

  return metadata;
};

export default useMetadata;
