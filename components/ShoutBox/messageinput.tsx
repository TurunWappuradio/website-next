import React, { ChangeEvent, Component, useEffect, useState } from 'react';
import NameFormatter from './nameformatter';
import TextField from './textfield';

const isButtonDisabled = (message: string, timeoutLeft: boolean) =>
  message === '' || timeoutLeft;

interface MessageInputProps {
  name: string;
  onSubmitMessage: (message: string) => void;
}

const MessageInput = ({ name, onSubmitMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [timeoutLeft, setTimeoutLeft] = useState(false);

  useEffect(() => {
    if (timeoutLeft) {
      // Set 5 second timeout between messages
      const timer = setTimeout(() => setTimeoutLeft(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [timeoutLeft]);

  function changeMessage(ev: ChangeEvent<HTMLInputElement>) {
    ev.preventDefault();
    if (ev.target.value.length > 200) {
      return;
    }
    setMessage(ev.target.value);
  }

  return (
    <form
      action="."
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitMessage(message);
        setMessage('');
        setTimeoutLeft(true);
      }}
      className="sbInputForm px[10px] flex h-full flex-row"
    >
      <TextField
        label={<NameFormatter name={name} />}
        placeholder={'Syötä viesti (max. 200 merkkiä)'}
        value={message}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => changeMessage(ev)}
        type={''}
      />
      <div className="sbButtonArea flex flex-col items-center justify-center">
        <button
          type="submit"
          value="Send"
          className="sbSubmitButton inline-block cursor-pointer select-none rounded border-[3px] border-white bg-transparent py-1.5 px-3 text-center align-middle text-base font-bold text-white disabled:opacity-50"
          disabled={isButtonDisabled(message, timeoutLeft)}
        >
          Lähetä
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
