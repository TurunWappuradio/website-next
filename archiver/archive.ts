export const fetchArchivedShowlist = async (showlistId: string) => {
  const showlistBaseUrl = process.env.ARCHIVE_SOURCE_URL;
  if(!showlistBaseUrl) {
    console.error('Arkiston polkua ei ole määritetty');
    return [];
  }
  const url = `${showlistBaseUrl}${showlistId}/showlist.json`;

  try {
    const response = await fetch(url);
    const showlist = await response.json();
    return showlist;
  } catch (error) {
    console.error(error);
    console.error('Ohjelmakartan nouto epäonnistui');
  }
  return { showsByDate: [], weekKeys: {} };

};