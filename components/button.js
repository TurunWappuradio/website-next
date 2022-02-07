import Link from 'next/Link';

const buttonStyle =
  'bg-teal px-8 py-3 text-blue font-bold hover:bg-coral transition ease-in-out rounded';

function Button({ children, className, ...props }) {
  return (
    <button className={`${buttonStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}

function LinkButton({ children, className, href, ...props }) {
  return (
    <Link href={href}>
      <a className={`${buttonStyle} ${className}`} {...props}>
        {children}
      </a>
    </Link>
  );
}

export { Button, LinkButton };
