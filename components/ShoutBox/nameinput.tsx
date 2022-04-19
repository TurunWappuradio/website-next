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
      className="sbInputForm"
    >
      <TextField
        label={''}
        placeholder="Syötä nimimerkki (max. 20 merkkiä)"
        value={name}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => changeName(ev)}
        type={''}
      />
      <div className="sbButtonArea">
        <button
          type="submit"
          value="Send"
          className="sbSubmitButton"
          disabled={isButtonDisabled(name)}
        >
          OK
        </button>
      </div>
    </form>
  );
};

export default NameInput;
