import { FC, useState, useEffect } from 'react';
import { startOfDay, format, parseISO, isSameDay } from 'date-fns';
import fi from 'date-fns/locale/fi';

// Fetch next events but not more than 6 months from now
const MONTHS_COUNT = 6;
const dateMax = new Date();
dateMax.setMonth(new Date().getMonth() + MONTHS_COUNT);

const params = new URLSearchParams({
  alwaysIncludeEmail: 'false',
  maxResults: '3',
  timeMin: startOfDay(new Date()).toISOString(),
  timeMax: dateMax.toISOString(),
  showDeleted: 'false',
  showHiddenInvitations: 'false',
  singleEvents: 'true',
  key: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY,
  orderBy: 'startTime',
}).toString();

const eventsUrl = `https://content.googleapis.com/calendar/v3/calendars/${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID}/events?${params}`;

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
      <h2 className="text-center text-xl font-bold text-white">
        Tulevat tapahtumat
      </h2>
      {events.map((event, idx) => (
        <Event key={idx} event={event} />
      ))}
      <a
        className="ml-auto font-bold text-teal underline transition hover:text-coral"
        href={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_SHARE_URL || ''}
        target="_blank"
        rel="noreferrer"
      >
        Tilaa kalenteri
      </a>
    </div>
  );
};

const Event: FC<{ event: Event }> = ({ event }) => {
  const start =
    'dateTime' in event.start
      ? parseISO(event.start.dateTime)
      : parseISO(event.start.date);
  const end =
    'dateTime' in event.end
      ? parseISO(event.end.dateTime)
      : parseISO(event.end.date);

  const dateFormatted = format(start, 'd.M.', { locale: fi });
  const weekday = format(start, 'eee', { locale: fi }).slice(0, 2);

  const timeFormatted =
    'dateTime' in event.start && isSameDay(start, end)
      ? formatWithTime(start, end)
      : formatWithoutTime(start, end);

  return (
    <div className="my-2 flex flex-row bg-blue-darkest p-2 text-white">
      <div className="flex w-28 flex-col items-center justify-center p-2">
        <div className="text-3xl font-bold">{dateFormatted}</div>
        <div className="text-lg font-bold">{weekday}</div>
      </div>
      <div className="w-full p-2">
        <h3 className="text-xl font-bold text-coral">{event.summary}</h3>
        <div>{timeFormatted}</div>
        {event.location && <div>@ {event.location}</div>}
      </div>
    </div>
  );
};

const formatWithTime = (start: Date, end: Date) => {
  const startFormatted = format(start, 'HH:mm', { locale: fi });
  const endFormatted = format(end, 'HH:mm', { locale: fi });
  return `kello ${startFormatted} &ndash; ${endFormatted}`;
};

const formatWithoutTime = (start: Date, end: Date) => {
  const startFormatted = format(start, 'cccc d.M.', { locale: fi });

  const endFormatted = format(end, 'cccc d.M.', { locale: fi });

  if (startFormatted === endFormatted) return 'Koko päivä';

  return `${startFormatted} &ndash; ${endFormatted}`;
};

export default Calendar;
