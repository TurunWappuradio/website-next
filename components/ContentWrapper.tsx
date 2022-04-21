const ContentWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => <div className="mx-auto h-full w-full lg:w-256">{children}</div>;

export default ContentWrapper;
