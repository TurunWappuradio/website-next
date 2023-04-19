import { format } from 'date-fns';
import React from 'react';

interface NameFormatterProps {
  name: string;
  timestamp?: number;
}

const NameFormatter = ({ name, timestamp }: NameFormatterProps) => {
  const time = timestamp ? format(new Date(timestamp), 'HH:mm') : null;

  return (
    <div
      className={`flex items-center pr-2 text-sm font-bold ${findStyle(name)}`}
    >
      {name}
      {time ? (
        <span className="pl-2 text-xs font-normal opacity-70">{time}</span>
      ) : null}
    </div>
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
