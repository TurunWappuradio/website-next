import {
  Show,
  fetchContent as fetchContentfulContent,
  parseQueryResultToShowlist,
} from 'contentful/client';
import {
  ShowlistDocument,
  ShowlistQuery,
} from 'contentful/graphql/showlist.graphql';
import { parseSheetToShowList, showsToGroups } from 'google/client';
import { GoogleConfigSheets, getSheet } from 'google/google';
import { mkdirSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getImagePath } from 'utils/fileHelpers';

export const archiveOldShowlists = async () => {
  // NOTE: Uncomment for archiving contentful data
  // const contentfullIds = [
  //   // { showlistId: 'syssyradio2020', name: '2020-syssy' },
  //   // { showlistId: 'wappuradio2021', name: '2021-wappu' },
  //   // { showlistId: 'wappuradio2022', name: '2022-wappu' },
  //   // { showlistId: 'syssyradio-2022', name: '2022-syssy' },
  // ];
  // for (const { showlistId, name } of contentfullIds) {
  //   await archiveContentful(showlistId, name);
  // }
  // NOTE: Uncomment for archiving google sheet data
  // const sheetConfigs = [
  //   { name: 'wappuradio2023', config: { apiKey: process.env.GA_API_KEY, spreadsheetId: '1eHDK-MYm6B3BH8rewQr04-pd2IK4iFwsPY5HKkrVNJg', range: 'Ohjelmakartta!A3:J120' } },
  //   // { name: 'syssyradio2023', config: { apiKey: process.env.GA_API_KEY, spreadsheetId: '', range: 'Ohjelmakartta!A3:J120' } }
  // ];
  // for(const { config, name, showStartTime } of sheetConfigs) {
  //   await archiveGogleSheet(config, name, showStartTime);
  // }
};

/** Helpers */

const getArchivePath = (showlistDir: string) =>
  path.join('.', 'stuff', 'archives', showlistDir);

const mkdirp = async (filePath: string) => {
  try {
    // Ensure dirs exists with mkdir
    mkdirSync(filePath, { recursive: true });
  } catch (error) {
    // noop. Throws error if dirs exists
  }
};

const archiveJson = async (archivePath: string, showlistData: {}) => {
  const archiveFilePath = path.join(archivePath, `showlist.json`);
  await fs.writeFile(archiveFilePath, JSON.stringify(showlistData), 'utf-8');
};

const downloadFile = async (url: string, destinationPath: string) => {
  // TODO: stream files directly to AWS?
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.writeFile(destinationPath, buffer);
};

/** Contentful - Pre wappu 2023 */

const archiveContentful = async (showlistId: string, name: string) => {
  const archivePath = getArchivePath(name);
  const pictureFolder = path.join(archivePath, 'pictures');
  mkdirp(archivePath);
  mkdirp(pictureFolder);

  const showlistResponse = await fetchContentfulContent<ShowlistQuery>(
    ShowlistDocument,
    { showlistId }
  );
  // NOTE: when data is stored locally
  // const showlistResponse = raw as ShowlistQuery;
  const shows = parseQueryResultToShowlist(showlistResponse);

  const showsWithNewFilePaths = await reconnectShowsWithLocalFiles(
    shows,
    pictureFolder
  );
  const showlistData = showsToGroups(showsWithNewFilePaths);

  await archiveJson(archivePath, showlistData);
};

const reconnectShowsWithLocalFiles = async (
  shows: Show[],
  archivePath: string
): Promise<Show[]> => {
  const showsWithLocalFiles = [];
  for (const show of shows) {
    const { name, pictureUrl } = show;
    if (!pictureUrl) {
      showsWithLocalFiles.push(show);
      continue;
    }

    const extension = path.parse(pictureUrl).ext;
    const newFilename = getImagePath('', name, extension);
    const filePath = path.join(archivePath, newFilename);
    await downloadFile(pictureUrl, filePath);

    showsWithLocalFiles.push({ ...show, pictureUrl: filePath });
  }
  return showsWithLocalFiles;
};

/** Google Sheets - Post wappu 2023 */

const archiveGogleSheet = async (
  config: GoogleConfigSheets,
  name: string,
  showStartTime: string
) => {
  const archivePath = getArchivePath(name);
  const pictureFolder = path.join(archivePath, 'pictures');
  mkdirp(archivePath);
  mkdirp(pictureFolder);

  const showlistResponse = await getSheet(config);
  const showlist = await parseSheetToShowList(showlistResponse, {
    apiKey: process.env.GA_API_KEY,
    fileUrlBase: path.join(name, 'pictures'),
    localFilePath: pictureFolder,
    showStartTime,
  });
  await archiveJson(archivePath, showlist);
};
