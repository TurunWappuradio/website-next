import React from 'react';

interface NameFormatterProps {
  name: string;
}

const NameFormatter = ({ name }: NameFormatterProps) => (
  <div
    className={` flex flex-col justify-center pr-2 text-sm font-bold ${findStyle(
      name
    )}`}
  >
    {name}:
  </div>
);

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
