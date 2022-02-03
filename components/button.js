function Button({ children, className, ...props }) {
  return (
    <button className={`bg-teal px-8 py-3 text-blue font-bold hover:bg-coral transition ease-in-out rounded ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;