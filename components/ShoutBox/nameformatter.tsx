import { format } from 'date-fns';
import React from 'react';
import Image from 'next/image';

interface NameFormatterProps {
  name: string;
  timestamp?: number;
  telegram?: boolean;
}

const NameFormatter = ({ name, timestamp, telegram }: NameFormatterProps) => {
  const time = timestamp ? format(new Date(timestamp), 'HH:mm') : null;

  return (
    <div
      className={`flex items-center pr-2 text-sm font-bold ${findStyle(name)}`}
    >
      {name}
      {telegram ? <a target="_blank" rel="noreferrer" href="https://t.me/turunwappuradio"><Image alt="Telegram" className="ml-2 w-3.5 h-3.5" src="/telegram.svg"></Image></a> : null}
      {
        time ? (
          <span className="pl-2 text-xs font-normal opacity-70" > {time}</span>
        ) : null
      }
    </div >
  );
};

const findStyle = (name: string) => {
  switch (name) {
    case 'Toimitus':
      return 'text-coral';
    case 'Palvelin':
      return 'text-coral';
    default:
      return 'text-white';
  }
};

export default NameFormatter;
