import React, { ChangeEvent } from 'react';

interface TextFieldProps {
  label: any;
  placeholder: string;
  value: string;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const TextField = ({
  label,
  placeholder,
  value,
  onChange,
  type,
}: TextFieldProps) => (
  <div className="TextFieldArea">
    {label}
    <input
      className="TextField"
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextField;
