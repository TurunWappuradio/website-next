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
  <div className="TextFieldArea mr-[16px] inline-flex w-full justify-around">
    {label}
    <input
      className="TextField w-full border-b-2 border-solid border-blue-lightest bg-transparent"
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextField;
