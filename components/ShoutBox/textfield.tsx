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
      className="TextField w-full rounded-none border-b-2 border-solid border-radio-controller bg-transparent text-white"
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextField;
