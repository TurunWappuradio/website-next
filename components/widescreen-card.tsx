import { Color } from 'contentful/client';

interface WideScreenCardProps {
  text: string;
  showLength: number;
  onClick: () => void;
  color?: Color;
}

export const WideScreencard = ({
  text,
  color,
  onClick,
  showLength,
}: WideScreenCardProps) => {
  const getBackgroundColor = () => {
    if (!color) return 'bg-orange';
    else if (color === Color.Promote) {
      return 'bg-purple-dark';
    } else if (color === Color.Night) {
      return 'bg-purple-light';
    }
  };

  return (
    <button className="card-height flex p-2" onClick={onClick}>
      <div
        className={`flex h-full w-full overflow-hidden rounded-sm px-1 ${getBackgroundColor()}`}
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
