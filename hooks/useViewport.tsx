import { useLayoutEffect, useState } from 'react';

export const useViewport = () => {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
    const handleWindowResize = () => setWidth(window?.innerWidth);
    window?.addEventListener('resize', handleWindowResize);
    return () => window?.removeEventListener('resize', handleWindowResize);
  }, []);

  const isDesktop = width > 1200;
  return { isDesktop };
};
