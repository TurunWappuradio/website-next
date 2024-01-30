import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  getISOWeek,
  parse,
} from 'date-fns';
import { groupBy, head, keys, last } from 'ramda';

export enum Color {
  Night = 'night',
  Promote = 'promote',
}
export interface Show {
  name?: string;
  start?: string;
  end?: string;
  date?: string;
  description?: null | string;
  pictureUrl?: string | null;
  hosts?: null | string;
  producer?: null | string;
  color?: Color | null;
}

export interface Showlist {
  showsByDate: Record<string, Show[]>;
  weekKeys: Record<string, string[]>;
}

export const showsToGroups = (shows: Show[]) => {
  const showsByDate = groupBy(
    (day: any) => format(new Date(day.start), 'y.M.dd'),
    shows
  );
  const weekKeys = generateWeekObj(showsByDate);
  return { showsByDate, weekKeys };
};

// Generate a nicely formatted object to use as keys.
const generateWeekObj = (showsByDate: Record<string, Show[]>) => {
  const start = parse(head(keys(showsByDate)), 'y.M.dd', new Date());
  const end = parse(last(keys(showsByDate)), 'y.M.dd', new Date());
  const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });

  const weekObj = weeks.reduce(
    (acc: Record<string, string[]>, weekStart: Date) => {
      const weekKey = getISOWeek(weekStart).toString();
      const days = eachDayOfInterval({
        start: weekStart,
        end: addDays(new Date(weekStart), 6),
      }).map((day: Date) => format(day, 'y.M.dd'));
      acc[weekKey] = days;
      return acc;
    },
    {}
  );

  return weekObj;
};
