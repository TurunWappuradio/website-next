import { useState, createContext, FunctionComponent, useContext } from 'react';

interface ShoutboxAndVideoContent {
  shoutboxOpen: boolean;
  setShoutboxOpen: (open: boolean) => void;
  videoOpen: boolean;
  setVideoOpen: (open: boolean) => void;
}

const Context = createContext<ShoutboxAndVideoContent>({
  shoutboxOpen: false,
  setShoutboxOpen: () => {},
  videoOpen: false,
  setVideoOpen: () => {},
});

export const ShoutBoxAndVideoProvider: FunctionComponent = ({ children }) => {
  const [shoutboxOpen, setShoutboxOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <Context.Provider
      value={{ shoutboxOpen, setShoutboxOpen, videoOpen, setVideoOpen }}
    >
      {children}
    </Context.Provider>
  );
};

const useShoutBoxAndVideo = (): ShoutboxAndVideoContent => {
  return useContext(Context);
};

export default useShoutBoxAndVideo;
