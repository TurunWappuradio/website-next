import { format } from 'date-fns';
import { groupBy } from 'ramda';

export enum Color {
  Night = 'night',
  Promote = 'promote',
  Editorial = 'editorial',
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

// key is a date encoded as string, in the format YYYY.MM.DD
export type ShowsByDate = Record<string, Show[]>;

export const showsToGroups = (shows: Show[]): ShowsByDate =>
  groupBy((day: any) => format(new Date(day.start), 'y.M.dd'), shows);
