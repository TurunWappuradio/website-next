import { archiveOldShowlists } from 'archiver/archiveCrawlers';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await archiveOldShowlists();
    res.status(200).json({ message: 'OK' });
  } catch (err) {
    console.debug(err);
    res.status(500).json({ message: err?.message });
  }
}
