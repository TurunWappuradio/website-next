interface WideScreenCardProps {
  text: string;
  showLength: number;
  onClick: () => void;
  color?: string;
}

export const WideScreencard = ({
  text,
  color,
  onClick,
  showLength,
}: WideScreenCardProps) => {
  const getBackgroundColor = () => {
    if (!color) return 'bg-orange';
    else if (color === 'promote') {
      return 'bg-purple-dark';
    } else if (color === 'night') {
      return 'bg-purple-light';
    }
  };

  return (
    <button className="card-height flex p-2" onClick={onClick}>
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
    </button>
  );
};
