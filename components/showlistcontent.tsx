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

const DateButton = ({ value, isSelected, onClick }: DateButton) => {
  const str = format(new Date(value), 'EEEE d.M', { locale: fi });
  return (
    <button
      className={`w-full rounded-sm p-2 text-left capitalize text-white ${
        isSelected ? 'bg-coral font-bold' : 'bg-blue-dark hover:text-coral'
      }`}
      onClick={() => onClick(value)}
    >
      {str}
    </button>
  );
};

interface ShowlistContentProps {
  showsByDate: {
    [key: string]: ShowsCollectionItem[];
  };
}

export const ShowlistContent = ({ showsByDate }: ShowlistContentProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    Object.keys(showsByDate).includes(format(new Date(), 'y.M.dd'))
      ? format(new Date(), 'y.M.dd')
      : Object.keys(showsByDate)[0]
  );

  return (
    <div className="flex flex-col pt-6 lg:flex-row">
      <select
        className="mb-4 mr-[22px] ml-6 flex h-8 rounded-sm  bg-blue-dark px-2 font-bold text-coral lg:mr-0 lg:hidden"
        onChange={(event) => setSelectedDate(event.target.value)}
        value={selectedDate}
      >
        {Object.keys(showsByDate).map((date, i) => {
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
        {showsByDate[selectedDate].map((show, i) => (
          <ShowCard show={show} key={show.date + i} index={i} />
        ))}
      </div>
      <div className="ml-4 hidden w-52 shrink-0 flex-col space-y-2 lg:flex">
        {Object.keys(showsByDate).map((date) => (
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
