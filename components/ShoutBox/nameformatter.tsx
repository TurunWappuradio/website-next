import React from 'react';

interface NameFormatterProps {
  name: string;
}

const NameFormatter = ({ name }: NameFormatterProps) => (
  <div className={`sbNameText ${findStyle(name)}`}>{name}:</div>
);

const findStyle = (name: string) => {
  switch (name) {
    case 'Toimitus':
      return 'sbNameText-Staff';
    case 'Palvelin':
      return 'sbNameText-Server';
    default:
      return 'sbNameText-Default';
  }
};

export default NameFormatter;
