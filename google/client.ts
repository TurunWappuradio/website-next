
import { sheets_v4 } from '@googleapis/sheets';
import { getMinutes } from 'date-fns';
import { addMinutes } from 'date-fns';
import { addMilliseconds } from 'date-fns';
import {
  addDays,
  addHours,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  formatISO,
  getHours,
  getISOWeek,
  parse,
} from 'date-fns';
import { getFile, getSheet } from 'google/google';
import { groupBy, head, keys, last } from 'ramda';
import downloadFile from 'utils/downloadFile';

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
  picture?: Picture | null;
  hosts?: null | string;
  producer?: null | string;
  color?: Color | null;
}
export interface Picture {
  title?: string;
  description?: null;
  contentType?: string;
  fileName?: string;
  size?: number;
  url?: string;
  width?: number;
  height?: number;
}

const parseSheetToShowList = async (googleSheetData: sheets_v4.Schema$ValueRange, { apiKey }: { apiKey: string}): Promise<Show[]> => {  
  const showStartTime = process.env.SHOW_START_TIME;
  if(!showStartTime) {
    throw new Error('Env "SHOW_START_TIME" is missing');
  }
  const nightTimeHourStart = 22;
  const nightTimeHourEnd = 6;

  const getIsNightTime = (date:Date) => {
    const startHour = getHours(date);
    return startHour >= nightTimeHourStart && startHour <= 23 || startHour <= nightTimeHourEnd && startHour >= 0;
  };
  const showList =  googleSheetData.values.reduce<Promise<Show[]>>(async (acc, sheetRow, index) => {
    if(!sheetRow || !Array.isArray(sheetRow)) {
      return acc;
    }
    const [_id, duration, _start, _end, producer, name, description, hosts, googleFileUrl , color] = sheetRow;
    // Duration can be decimal and because google sheet requires comma, make those a number
    const durationNumber = duration.includes(',') ? Number(duration?.replace(',','.')) : duration;
    // Lookup didn't find a show
    if(!name || name === '#N/A') {
      return acc;
    }
    const shows = await acc;

    const previousEndTime = index ? shows[index-1].end : showStartTime;
    const startDate = new Date(previousEndTime);
    const durationMillis = durationNumber*1000*60*60;
    const endDate = new Date(addMilliseconds(startDate, durationMillis));

    const showColor = (color === Color.Night || getIsNightTime(startDate))
      ? Color.Night
      : color === Color.Promote
        ? Color.Promote
        :  null;

    console.log(showColor, color);
    const fileId = googleFileUrl?.match(/.*id=(.*[^&]).*/)?.[1]; // Parse id from query params `id=*`
    const picture = await downloadShowFile(fileId, name, { apiKey });
    
    return shows.concat({
      name,
      start: formatISO(startDate),
      end: formatISO(endDate),
      date: formatISO(startDate),
      description,
      picture,
      hosts,
      producer,
      color: showColor,
    });
  }, Promise.resolve([]));
  return showList;
};

export const fetchShowlist = async (
): Promise<{
  showsByDate: Record<string, Show[]>;
  weekKeys: Record<string, string[]>;
}> => {

  const data = await getSheet({
    apiKey: process.env.GA_API_KEY,
    spreadsheetId: process.env.GA_SPREADSHEET_SHOWLIST,
    range: process.env.GA_SPREADSHEET_RANGE
  });
  if(!data) {
    return {
      showsByDate: {},
      weekKeys: {}
    };
  }

  const shows = data ? await parseSheetToShowList(data, {apiKey: process.env.GA_API_KEY}) : [];

  const showsByDate = groupBy(
    (day: any) => format(new Date(day.start), 'y.M.dd'),
    shows
  );
  const weekKeys = generateWeekObj(showsByDate);
  return { showsByDate, weekKeys };
};

const downloadShowFile = async (fileId: string, fileTitle: string, { apiKey }:{apiKey:string}): Promise<Picture> => {
  if(!fileId || !apiKey) {
    return null;
  }
  const result = await getFile({
    apiKey,
    fileId,
    fields: ['originalFilename', 'mimeType', 'webContentLink', 'size', 'mimeType']
  });
  const { originalFilename, mimeType, webContentLink, size  } = result.data;
  const nextUrl = `/showlist`;
  const fileUrl = `./public${nextUrl}`;
  let newFilename = null;
  try {
    newFilename = await downloadFile(webContentLink, fileUrl, originalFilename);
  } catch (error) {
    console.error(`Failed to load google file ${fileId}`);
    console.error(error);
    return null;
  }
  return {
    title: fileTitle,
    url: `${nextUrl}/${newFilename}`,
    size: size ? Number(size) : null,
    contentType: mimeType
  };
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
