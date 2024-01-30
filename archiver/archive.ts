import { Show, Showlist, showsToGroups } from 'google/showlistHelpers';

const showlistBaseUrl = process.env.ARCHIVE_SOURCE_URL;
const emptyResponse = { showsByDate: [], weekKeys: {} } as const;

/**
 * Archive S3 bucket API
 */
export const fetchArchivedShowlist = async (showlistId: string) => {
  if(!showlistBaseUrl) {
    console.error('Arkiston polkua ei ole määritetty');
    return emptyResponse;
  }
  const url = `${showlistBaseUrl}${showlistId}/showlist.json`;

  try {
    const response = await fetch(url);
    const showlist: Show[] | Showlist = await response.json();

    if(Array.isArray(showlist)) {
      return showsToGroups(showlist);
    }
    if(showlist?.showsByDate) {
      return showlist;
    }
    return emptyResponse;
  } catch(error) {
    console.error(error);
    console.error('Ohjelmakartan nouto epäonnistui');
  }
  return emptyResponse;
};
