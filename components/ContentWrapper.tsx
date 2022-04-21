const ContentWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => (
  <div className="mx-auto h-full w-full px-3 md:w-full md:px-6 lg:w-192 lg:px-0 xl:w-256">
    {children}
  </div>
);

export default ContentWrapper;
