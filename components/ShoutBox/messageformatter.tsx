import React from 'react';

import NameFormatter from './nameformatter';

interface MessageFormatterProps {
  name: string;
  timestamp: number;
  message: string;
  color: string;
  isAdmin: boolean;
  onBanClick: (name: string) => void;
  telegram: boolean;
}

const MessageFormatter = ({
  name,
  timestamp,
  message,
  color,
  isAdmin,
  onBanClick,
  telegram,
}: MessageFormatterProps) => (
  <div className={` flex ${color} py-3`}>
    <div
      style={{
        width: isAdmin ? 'calc(100% - 94px)' : '100%',
        paddingLeft: '0.5rem',
      }}
    >
      <NameFormatter telegram={telegram} name={name} timestamp={timestamp} />
      <div className="break-words text-sm">{message}</div>
    </div>
    {isAdmin && name !== 'Toimitus' && name !== 'Palvelin' && !telegram && (
      <button
        className="m-1 inline-block cursor-pointer select-none rounded border border-white px-3 py-1.5 text-center align-middle text-base font-bold text-radio-accent"
        onClick={() => onBanClick(name)}
      >
        Bännää
      </button>
    )}
  </div>
);

export default MessageFormatter;
