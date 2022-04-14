import {
  format,
  getISOWeek,
  parse,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  differenceInMinutes,
  min,
} from 'date-fns';
import { groupBy, uniq } from 'ramda';
import { useState } from 'react';
import fi from 'date-fns/locale/fi';

import { ShowsCollectionItem } from 'pages/arkisto/[showlistId]';
import { ModeButton } from './button';
import { WideScreencard } from './widescreen-card';
import { ShowCard } from './showcard';

interface ShowlistMapProps {
  shows: ShowsCollectionItem[];
}

const groupByWeek = groupBy((show: ShowsCollectionItem) =>
  getISOWeek(new Date(show.start)).toString()
);

const getInitialWeek = (weeks: any) => {
  const currentWeek = getISOWeek(new Date());
  if (weeks.includes(currentWeek)) {
    return currentWeek;
  }
  return weeks[0];
};

export const ShowlistMap = ({ shows }: ShowlistMapProps) => {
  const showsGroupedByWeek = groupByWeek(shows);
  const [openWeek, setWeek] = useState(
    getInitialWeek(Object.keys(showsGroupedByWeek))
  );
  const [selectedShow, setSelectedShow] = useState<ShowsCollectionItem | null>(
    null
  );
  const groupWeekByDay = groupBy(
    (day: any) => format(new Date(day.start), 'y.M.dd'),
    showsGroupedByWeek[openWeek]
  );

  // prettier-ignore
  const timeStamps: string[] = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

  const daysInWeek = eachDayOfInterval({
    start: startOfWeek(
      parse(Object.keys(groupWeekByDay)[0], 'y.M.dd', new Date()),
      {
        weekStartsOn: 1,
      }
    ),
    end: endOfWeek(
      parse(Object.keys(groupWeekByDay)[0], 'y.M.dd', new Date()),
      {
        weekStartsOn: 1,
      }
    ),
  });

  const formattedDatesInWeek = daysInWeek.map((n) => format(n, 'y.M.dd'));
  const allDates = shows.map((n) => new Date(n.start));

  const firstDay = min(allDates);

  const firstDayHours = firstDay.getHours();

  return (
    <div className="mb-4 flex flex-col pt-6">
      {selectedShow && (
        <ShowCard
          show={selectedShow}
          index={0}
          className="mt-4 max-w-[750px]"
          forceOpen={true}
        />
      )}
      <div className="flex space-x-2 p-6">
        {Object.keys(showsGroupedByWeek).map((n, i) => (
          <ModeButton
            key={n + i}
            text={'Viikko ' + n}
            onClick={() => setWeek(n)}
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
          {formattedDatesInWeek.map((n, i) => {
            return (
              <div
                key={i}
                className="flex w-full max-w-[1/7] flex-col text-center"
              >
                <p className="mx-auto w-full font-bold text-white">
                  {format(parse(n, 'y.M.dd', new Date()), 'EEEEEE dd.M.', {
                    locale: fi,
                  })}
                </p>
                {n === format(firstDay, 'y.M.dd') && (
                  <div className="card-height" />
                )}
                {groupWeekByDay[n]?.length > 0 &&
                  groupWeekByDay[n]?.map((show: ShowsCollectionItem, i) => {
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
      <style jsx>{`
        .card-height {
          height: ${firstDayHours * 60}px;
        }
      `}</style>
    </div>
  );
};

export default ShowlistMap;
