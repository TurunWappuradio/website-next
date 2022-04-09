interface WideScreenCardProps {
  text: string;
  showLength: number;
  color?: string;
}

export const WideScreencard = ({
  text,
  color,
  showLength,
}: WideScreenCardProps) => {
  const getBackgroundColor = () => {
    if (!color) return 'bg-coral';
    else if (color === 'promote') {
      return 'bg-teal';
    } else if (color === 'night') {
      return 'bg-blue-lightest';
    }
  };

  return (
    <div className="card-height flex p-2">
      <div
        className={`flex h-full w-full rounded-sm px-1 ${getBackgroundColor()}`}
      >
        <p
          className="m-auto text-sm text-white"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <style jsx>{`
        .card-height {
          height: ${showLength}px;
        }
      `}</style>
    </div>
  );
};
