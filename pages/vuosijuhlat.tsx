import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Vuosijuhlat = () => {
  const { push } = useRouter();
  useEffect(() => {
    push(
      'https://docs.google.com/gview?embedded=true&url=https://turunwappuradio.com/laulut.pdf'
    );
  }, []);
  return <p></p>;
};

export default Vuosijuhlat;
