import { NextPage } from 'next';
import { FormEvent, useState } from 'react';

import { Input } from 'components/input';
import { Button } from 'components/button';

const Metadata: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);

    const target = ev.target as HTMLFormElement;
    const artist = target.artist.value;
    const track = target.track.value;
    const password = target.password.value;

    const body = JSON.stringify({
      song: `${artist} - ${track}`,
      password,
    });

    try {
      await fetch(process.env.NEXT_PUBLIC_METADATA_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      alert('Metadatan lisääminen onnistu. Hyvä sää!');
    } catch (err) {
      alert('Metadatan lisääminen epäonnistui. :(');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex w-144 flex-col bg-blue-darkest px-6 py-12 text-white"
      >
        <h1 className="text-4xl font-bold text-coral">
          Musiikin metadatan syöttö
        </h1>

        <label htmlFor="artist" className="mt-4">
          Artisti
        </label>
        <Input type="text" id="artist" />

        <label htmlFor="track" className="mt-4">
          Kappaleen nimi
        </label>
        <Input type="text" id="track" />

        <label htmlFor="password" className="mt-4">
          Salasana
        </label>
        <Input type="password" id="password" />

        {loading ? (
          <p className="ml-auto mt-4 px-8 py-3 text-coral">Lähetetään...</p>
        ) : (
          <Button className="mt-4 ml-auto">Tallenna</Button>
        )}
      </form>
    </div>
  );
};

export default Metadata;
