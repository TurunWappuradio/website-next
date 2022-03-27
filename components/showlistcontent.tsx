import { format } from 'date-fns';
import fi from 'date-fns/locale/fi';
import { Dispatch, SetStateAction, useState } from 'react';

import { ShowCard } from 'components/showcard';
import { ShowsCollectionItem } from '../pages/arkisto/[showlistId]';

interface DateButton {
  value: string;
  isSelected: boolean;
  onClick: Dispatch<SetStateAction<string>>;
}

const DateButton: React.FC<DateButton> = ({ value, isSelected, onClick }) => {
  const str = format(new Date(value), 'EEEE d.M', { locale: fi });
  const text = str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <button
      className={`w-full rounded-sm p-2 text-left text-white ${
        isSelected ? 'bg-coral' : 'bg-blue-dark hover:text-coral'
      }`}
      onClick={() => onClick(value)}
    >
      {text}
    </button>
  );
};

interface ShowlistContentProps {
  byDate: {
    [key: string]: ShowsCollectionItem[];
  };
}

export const ShowlistContent = ({ byDate }: ShowlistContentProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    Object.keys(byDate)[0]
  );
  return (
    <div className="flex flex-col pt-8 md:flex-row">
      <select
        className="mb-4 flex h-8 rounded-sm border border-white bg-blue-dark px-2 text-white md:hidden"
        onChange={(event) => setSelectedDate(event.target.value)}
        value={selectedDate}
      >
        {Object.keys(byDate).map((date, i) => {
          const str = format(new Date(date), 'EEEE d.M', { locale: fi });
          const text = str.charAt(0).toUpperCase() + str.slice(1);
          return (
            <option key={date + i} value={date}>
              {text}
            </option>
          );
        })}
      </select>
      <div className="mx-auto w-full space-y-4">
        {byDate[selectedDate].map((show, i) => (
          <ShowCard show={show} key={show.date + i} index={i} />
        ))}
      </div>
      <div className="ml-4 hidden w-52 shrink-0 flex-col space-y-2 md:flex">
        {Object.keys(byDate).map((date) => (
          <DateButton
            key={date}
            value={date}
            isSelected={selectedDate === date}
            onClick={(date) => setSelectedDate(date)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowlistContent;
