import React from 'react';
import NameFormatter from './nameformatter';

interface MessageFormatterProps {
  name: string;
  message: string;
  color: string;
  isAdmin: boolean;
  onBanClick: (name: string) => void;
}

const MessageFormatter = ({
  name,
  message,
  color,
  isAdmin,
  onBanClick,
}: MessageFormatterProps) => (
  <div className={` flex ${color}`}>
    <div
      style={{
        width: isAdmin ? 'calc(100% - 94px)' : '100%',
        paddingLeft: '0.5rem',
      }}
    >
      <NameFormatter name={name} />
      <div className=" mt-2 break-words text-sm">{message}</div>
    </div>
    {isAdmin && name !== 'Toimitus' && name !== 'Palvelin' && (
      <button
        className="m-1 inline-block cursor-pointer select-none rounded border-[1px] border-white bg-transparent py-1.5 px-3 text-center align-middle text-base font-bold text-coral"
        onClick={() => onBanClick(name)}
      >
        Bännää
      </button>
    )}
  </div>
);

export default MessageFormatter;
