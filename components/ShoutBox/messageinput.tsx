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
      className="sbInputForm"
    >
      <TextField
        label={<NameFormatter name={name} />}
        placeholder={'Syötä viesti (max. 200 merkkiä)'}
        value={message}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => changeMessage(ev)}
        type={''}
      />
      <div className="sbButtonArea">
        <button
          type="submit"
          value="Send"
          className="sbSubmitButton"
          disabled={isButtonDisabled(message, timeoutLeft)}
        >
          Lähetä
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
