import { getPostContent, getPostDataSimplifiedBySlug } from "@/utils/Blog";
import { NextApiRequest, NextApiResponse } from "next";

// page.test/api/blog/posts/[slug].tsx

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  const { slug } = req.query;
  try {
    const data = await getPostDataSimplifiedBySlug(slug as string);
    const content = await getPostContent(data.id);
    res.status(200).json({ ...data, content });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
