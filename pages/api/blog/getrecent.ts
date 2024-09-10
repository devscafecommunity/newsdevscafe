import { getPostDataSimplified } from "../../../utils/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  try {
    const raw = await getPostDataSimplified();
    const posts = raw.filter((post) => {
      const created_time = new Date(post.created_time).getTime();
      const now = new Date().getTime();
      return now - created_time < 1000 * 60 * 60 * 24 * 7;
    });

    res.status(200).json(posts);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

