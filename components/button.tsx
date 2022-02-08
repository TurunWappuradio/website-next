import Link from 'next/Link';
import { ReactNode } from 'react';

const buttonStyle =
  'bg-teal px-8 py-3 text-blue font-bold hover:bg-coral transition ease-in-out rounded';

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`${buttonStyle} ${className || ''}`} {...props}>
      {children}
    </button>
  );
}

interface LinkButtonProps {
  children: ReactNode;
  className?: string;
  href: string;
}

function LinkButton({ children, className, href, ...props }: LinkButtonProps) {
  return (
    <Link href={href}>
      <a className={`${buttonStyle} ${className || ''}`} {...props}>
        {children}
      </a>
    </Link>
  );
}

export { Button, LinkButton };
