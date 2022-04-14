import { ReactNode } from 'react';

interface InputProps {
  children?: ReactNode;
  className?: string;
  type?: string;
  labelFor?: string;
  id?: string;
}

const Input = ({ children, className, ...props }: InputProps) => (
  <input
    className={`rounded border bg-transparent px-4 py-2  ${className || ''}`}
    {...props}
  >
    {children}
  </input>
);

export { Input };
