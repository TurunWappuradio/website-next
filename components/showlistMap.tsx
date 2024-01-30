import { useState } from 'react';
import { differenceInMinutes, format, parse } from 'date-fns';
import fi from 'date-fns/locale/fi';
import { head, keys } from 'ramda';

import { Show } from 'scripts/google/showlistHelpers';
import { ModeButton } from './button';
import { ShowCard } from './showcard';
import { WideScreencard } from './widescreen-card';

interface ShowlistMapProps {
  showsByDate: Record<string, Show[]>;
  weekKeys: Record<string, string[]>;
}

export const ShowlistMap = ({ showsByDate, weekKeys }: ShowlistMapProps) => {
  const weeks = keys(weekKeys);

  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [openWeek, setOpenWeek] = useState<string | null>(head(weeks));

  const openWeekDays = weekKeys[openWeek] ?? [];

  // prettier-ignore
  const timeStamps: string[] = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

  return (
    <div className="mb-4 flex flex-col pt-6">
      {selectedShow && (
        <ShowCard
          show={selectedShow}
          index={0}
          className="mx-auto mt-4 max-w-[60rem]"
          forceOpen={true}
        />
      )}
      <div className="flex space-x-2 p-6">
        {weeks.map((n, i) => (
          <ModeButton
            key={n + i}
            text={'Viikko ' + n}
            onClick={() => setOpenWeek(n)}
            isActive={openWeek === n}
          />
        ))}
      </div>
      <div className="flex">
        <div className="-mt-3 p-6">
          {timeStamps.map((timeStamp, i) => (
            <p className="h-[60px] font-bold text-white" key={i}>
              {timeStamp}
            </p>
          ))}
        </div>
        <div className="flex w-full">
          {openWeekDays.map((day, i) => {
            return (
              <div
                key={i}
                className="flex w-full max-w-[1/7] flex-col text-center"
              >
                <p className="mx-auto w-full font-bold text-white">
                  {format(parse(day, 'y.M.dd', new Date()), 'EEEEEE dd.M.', {
                    locale: fi,
                  })}
                </p>

                {/* If the first show of the day does not start at midnight, add buffer */}
                {showsByDate[day] && (
                  <Buffer firstShow={showsByDate[day][0]} day={day} />
                )}

                {showsByDate[day]?.map((show: Show, i) => {
                  return (
                    <WideScreencard
                      onClick={() => setSelectedShow(show)}
                      key={i}
                      showLength={differenceInMinutes(
                        new Date(show.end),
                        new Date(show.start)
                      )}
                      text={show?.name}
                      color={show?.color}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// If the first show of the day does not start at midnight, add buffer
const Buffer = ({ firstShow, day }: { firstShow: Show; day: string }) => {
  const dayParsed = parse(day, 'y.M.dd', new Date());
  const startTime = new Date(firstShow.start);
  const diff = differenceInMinutes(startTime, dayParsed);

  if (diff == 0) {
    return null;
  }

  return <div style={{ height: `${diff}px` }} />;
};

export default ShowlistMap;
