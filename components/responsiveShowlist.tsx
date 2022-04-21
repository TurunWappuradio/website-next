import { format, parse } from 'date-fns';
import fi from 'date-fns/locale/fi';
import { Dispatch, SetStateAction, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import { ShowCard } from 'components/showcard';
import { Show } from 'contentful/client';
import ContentWrapper from './ContentWrapper';

interface NavButton {
  value: string | null;
  onClick: (date: string) => void;
  text: string;
  alternate?: boolean;
}

const NavButton = ({ value, onClick, text, alternate = false }: NavButton) => {
  const disabled = !value;
  return (
    <>
      <a
        className={`${'flex py-8 font-bold text-teal transition hover:text-coral'}
        ${disabled ? 'hidden' : ''}
        ${alternate ? '' : ''}
        `}
        onClick={() => onClick(value)}
        href="javascript:void(0);"
      >
        {alternate && <BsArrowLeft className="mr-2 h-6 w-6" />}
        {text}
        {!alternate && <BsArrowRight className="ml-2 h-6 w-6" />}
      </a>
    </>
  );
};

interface DateButton {
  value: string;
  isSelected: boolean;
  onClick: Dispatch<SetStateAction<string>>;
}
const DateButton = ({ value, isSelected, onClick }: DateButton) => {
  const dateParsed = parse(value, 'y.M.dd', new Date());
  const str = format(dateParsed, 'cccc d.M', { locale: fi });

  return (
    <button
      className={`w-full rounded-sm p-2 text-left capitalize text-white ${
        isSelected ? 'bg-coral font-bold' : 'bg-blue-darkest hover:text-coral'
      }`}
      onClick={() => onClick(value)}
    >
      {str}
    </button>
  );
};

interface ResponsiveShowlistProps {
  showsByDate: {
    [key: string]: Show[];
  };
}

export const ResponsiveShowlist = ({
  showsByDate,
}: ResponsiveShowlistProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    Object.keys(showsByDate).includes(format(new Date(), 'y.M.dd'))
      ? format(new Date(), 'y.M.dd')
      : Object.keys(showsByDate)[0]
  );

  const setDateAndScroll = (date: string) => {
    setSelectedDate(date);
    var element = document.getElementById('showList');
    element.scrollIntoView(true);
  };

  const dates = Object.keys(showsByDate).map((date) => date);
  const getNextDate =
    dates.indexOf(selectedDate) < dates.length - 1
      ? dates[dates.indexOf(selectedDate) + 1]
      : null;
  const getPreviousDate =
    dates.indexOf(selectedDate) <= dates.length - 1
      ? dates[dates.indexOf(selectedDate) - 1]
      : null;

  return (
    <ContentWrapper>
      <div className="flex w-full flex-col pt-6 lg:flex-row" id="showList">
        <select
          className="mb-4 ml-6 flex h-8 rounded-sm  bg-blue-dark px-2 font-bold text-coral lg:hidden"
          onChange={(event) => setSelectedDate(event.target.value)}
          value={selectedDate}
        >
          {Object.keys(showsByDate).map((date, i) => {
            const dateParsed = parse(date, 'y.M.dd', new Date());

            const str = format(dateParsed, 'cccc d.M', { locale: fi });
            const text = str.charAt(0).toUpperCase() + str.slice(1);
            return (
              <option key={date + i} value={date}>
                {text}
              </option>
            );
          })}
        </select>

        <div className="ml-[-1.5rem] w-[calc(100%+1.5rem)] space-y-4">
          {showsByDate[selectedDate].map((show, i) => (
            <ShowCard show={show} key={show.date + i} index={i} />
          ))}
        </div>
        <div className="ml-4 mr-[-11rem] hidden w-[10rem] shrink-0 flex-col space-y-2 lg:flex">
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
      <div className="mx-auto mt-2 flex w-full justify-center md:justify-end">
        <div className={`${getNextDate ? 'mr-6' : ''}`}>
          <NavButton
            text="Edellinen päivä"
            value={getPreviousDate}
            onClick={(date) => setDateAndScroll(date)}
            alternate
          />
        </div>
        <NavButton
          text="Seuraava päivä"
          value={getNextDate}
          onClick={(date) => setDateAndScroll(date)}
        />
      </div>
    </ContentWrapper>
  );
};

export default ResponsiveShowlist;
