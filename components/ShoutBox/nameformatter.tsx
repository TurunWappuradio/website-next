import React from 'react';

interface NameFormatterProps {
  name: string;
}

const NameFormatter = ({ name }: NameFormatterProps) => (
  <div className={`${findStyle(name)}`}>{name}:</div>
);

const findStyle = (name: string) => {
  switch (name) {
    case 'Toimitus':
      return 'text-blue-darkest';
    case 'Palvelin':
      return 'text-blue-darkest';
    default:
      return 'text-white';
  }
};

export default NameFormatter;
