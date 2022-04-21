import { useState, createContext, FunctionComponent, useContext } from 'react';

interface ShoutboxContent {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Context = createContext<ShoutboxContent>({
  open: false,
  setOpen: () => {},
});

export const ShoutBoxProvider: FunctionComponent = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Context.Provider value={{ open, setOpen }}>{children}</Context.Provider>
  );
};

const useShoutBox = (): [boolean, (open: boolean) => void] => {
  const { open, setOpen } = useContext(Context);
  return [open, setOpen];
};

export default useShoutBox;
