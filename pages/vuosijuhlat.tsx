import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
