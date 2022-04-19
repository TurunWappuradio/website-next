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
  <div
    className={`sbSingleMessageBox ${color ? 'sbSingleMessageBox-dark' : ''}`}
  >
    <div
      style={{
        width: isAdmin ? 'calc(100% - 94px)' : '100%',
        paddingLeft: '0.5rem',
      }}
    >
      <NameFormatter name={name} />
      <div className="sbMessageText">{message}</div>
    </div>
    {isAdmin && name !== 'Toimitus' && name !== 'Palvelin' && (
      <button onClick={() => onBanClick(name)}>Bännää</button>
    )}
  </div>
);

export default MessageFormatter;
