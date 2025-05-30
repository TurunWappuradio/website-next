import { FC, ReactNode } from 'react';
import Link from 'next/link';

const buttonStyle =
  'bg-radio-action px-6 md:px-8 py-2 md:py-3 text-blue font-bold hover:bg-radio-accent200 transition ease-in-out rounded';

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
  const isExternal = !href.startsWith('https://turunwappuradio.com');
  const target = isExternal ? '_blank' : null;
  const rel = isExternal ? 'noopener noreferrer' : null;

  return (
    <Link href={href}>
      <a
        target={target}
        rel={rel}
        className={`${buttonStyle} ${className || ''}`}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

interface ModeButton {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const ModeButton = ({ text, isActive, onClick, ...props }: ModeButton) => {
  return (
    <button
      {...props}
      className={`rounded-sm p-2 text-white ${
        isActive ? 'bg-radio-accent' : 'bg-radio-common hover:text-radio-accent'
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { Button, LinkButton, ModeButton };
