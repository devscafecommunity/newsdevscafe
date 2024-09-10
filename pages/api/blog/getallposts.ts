import { getPostDataSimplified } from "../../../utils/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await getPostDataSimplified();
    res.status(200).json(posts);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};