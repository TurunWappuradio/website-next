import Link from 'next/link';
import { FC, ReactNode } from 'react';

const buttonStyle =
  'bg-teal px-8 py-3 text-blue font-bold hover:bg-coral transition ease-in-out rounded';

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={`${buttonStyle} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

interface LinkButtonProps {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
}

const LinkButton: FC<LinkButtonProps> = ({
  children,
  className,
  href,
  ...props
}) => {
  return (
    <Link href={href}>
      <a className={`${buttonStyle} ${className || ''}`} {...props}>
        {children}
      </a>
    </Link>
  );
};

export { Button, LinkButton };
