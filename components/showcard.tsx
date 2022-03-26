import { ShowsCollectionItem } from 'pages/arkisto/[showlistId]';

interface ShowCard {
  show: ShowsCollectionItem;
}

export const ShowCard: React.FC<ShowCard> = ({ show }) => {
  return (
    <div className="h-52 w-full">
      <p className="rotate-90 text-white"> 14:00 - 15:00</p>
      <div className="h-full"></div>
    </div>
  );
};

export default ShowCard;
