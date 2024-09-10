import { getAuthors } from '../../../utils/Blog';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  try {
    const authors = await getAuthors();
    res.status(200).json(authors);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};