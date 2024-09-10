import { getPostDataSimplified } from "../../../utils/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  try {
    const posts = await getPostDataSimplified();
    res.status(200).json(posts);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};