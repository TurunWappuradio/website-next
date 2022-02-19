import { FC, useState, useEffect } from 'react';
import { startOfDay, format, differenceInDays, parseISO } from 'date-fns';
import fi from 'date-fns/locale/fi';
import { LinkButton } from './button';

// Fetch next events but not more than 6 months from now
const EVENT_COUNT = 3;
const MONTHS_COUNT = 6;
const dateMax = new Date();
dateMax.setMonth(new Date().getMonth() + MONTHS_COUNT);
const TIME_MIN = startOfDay(new Date()).toISOString();
const TIME_MAX = dateMax.toISOString();

const eventsUrl = `https://content.googleapis.com/calendar/v3/calendars/${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID}/events?alwaysIncludeEmail=false&maxResults=${EVENT_COUNT}&timeMin=${TIME_MIN}&timeMax=${TIME_MAX}&showDeleted=false&showHiddenInvitations=false&singleEvents=true&key=${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}&orderBy=startTime`;

interface EventWithDate {
  start: { date: string };
  end: { date: string };
  summary: string;
  location: string;
}

interface EventWithDatetime {
  start: { dateTime: string };
  end: { dateTime: string };
  summary: string;
  location: string;
}

type Event = EventWithDate | EventWithDatetime;

const Calendar: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    fetch(eventsUrl)
      .then((res) => res.json())
      .then((json) => setEvents(json.items))
      .catch(console.error);
  }, []);

  return (
    <div className="m-4 flex w-128 max-w-full flex-col md:m-8">
      <h2 className="text-center text-xl font-bold text-white">Tulevat tapahtumat</h2>
      {events.map((event) => (
        <Event event={event} />
      ))}
      <a
        className="ml-auto font-bold text-teal underline transition hover:text-coral"
        href={process.env.NEXT_PUBLIC_NEXT_PUBLIC_GOOGLE_CALENDAR_SHARE_URL || ''}
        target="_blank"
      >
        Tilaa kalenteri
      </a>
    </div>
  );
};

const Event: FC<{ event: Event }> = ({ event }) => {
  const start =
    'dateTime' in event.start ? parseISO(event.start.dateTime) : parseISO(event.start.date);
  const end = 'dateTime' in event.end ? parseISO(event.end.dateTime) : parseISO(event.end.date);

  const dateFormatted = format(start, 'd.M.', { locale: fi });
  const weekday = format(start, 'eee', { locale: fi }).slice(0, 2);

  const timeFormatted =
    'dateTime' in event.start ? formatWithTime(start, end) : formatWithoutTime(start, end);

  return (
    <div className="my-2 flex flex-row bg-blue-darkest text-white">
      <div className="flex w-28 flex-col items-center justify-center p-4">
        <div className="text-3xl font-bold">{dateFormatted}</div>
        <div className="text-lg">{weekday}</div>
      </div>
      <div className="w-full p-4">
        <h3 className="text-xl font-bold text-coral">{event.summary}</h3>
        <div>{timeFormatted}</div>
        <div>@ {event.location}</div>
      </div>
    </div>
  );
};

const formatWithTime = (start: Date, end: Date) => {
  const startFormatted = format(start, 'HH:mm', { locale: fi });
  const endFormatted = format(end, 'HH:mm', { locale: fi });
  return `${startFormatted} - ${endFormatted}`;
};

const formatWithoutTime = (start: Date, end: Date) => {
  const startFormatted = format(start, 'd.M.', { locale: fi });
  const endFormatted = format(end, 'd.M.', { locale: fi });
  return `${startFormatted} - ${endFormatted}`;
};

// const formatTimestamp = (start: string, end: string) => {
//   const loc = { locale: fi };

//   // includes time for event.
//   if (start.dateTime) {
//     const startFormatted = format(new Date(start.dateTime), "EEEE, dd.MM. 'kello' H:mm", loc);
//     const endFormatted = format(new Date(end.dateTime), 'H:mm', loc);
//     return concat(startFormatted, endFormatted);
//   }

//   const startDate = new Date(start.date);
//   const endDate = new Date(end.date);

//   // event length is 1 day.
//   if (differenceInDays(endDate, startDate) === 1) {
//     return format(startDate, 'EEEE dd.MM.', loc);
//   }

//   const startFormatted = format(startDate, 'EEEE dd.MM.', loc);

//   // subtract one, as the end date is always set to midnight causing an off-by-one
//   const ONE_DAY_IN_MILLISECONDS = 86400000;
//   const endFormatted = format(endDate - ONE_DAY_IN_MILLISECONDS, 'EEEE dd.MM.', loc);

//   return concat(startFormatted, endFormatted);
// };

const concat = (start: string, end: string) => `${start} - ${end}`;

export default Calendar;
