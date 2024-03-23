import React, { ChangeEvent, useState } from 'react';

import TextField from './textfield';

const isButtonDisabled = (name: string) => name === '';

interface NameInputProps {
  onSubmitName: (name: string) => void;
}

const NameInput = ({ onSubmitName }: NameInputProps) => {
  const [name, setName] = useState('');

  function changeName(ev: ChangeEvent<HTMLInputElement>) {
    ev.preventDefault();
    if (ev.target.value.length > 20) {
      return;
    }
    setName(ev.target.value);
  }

  return (
    <form
      action="."
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitName(name);
        setName('');
      }}
      className=" px[10px] flex h-full flex-row"
    >
      <TextField
        label={''}
        placeholder="Syötä nimimerkki (max. 20 merkkiä)"
        value={name}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => changeName(ev)}
        type={''}
      />
      <div className="sbButtonArea flex flex-col items-center justify-center">
        <button
          type="submit"
          value="Send"
          className="sbSubmitButton inline-block cursor-pointer select-none rounded border-[3px] border-white bg-transparent px-3 py-1.5 text-center align-middle text-base font-bold text-white disabled:opacity-50"
          disabled={isButtonDisabled(name)}
        >
          OK
        </button>
      </div>
    </form>
  );
};

export default NameInput;
