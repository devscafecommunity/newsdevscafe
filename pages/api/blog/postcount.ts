import { getTotalPostCount } from "@/utils/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  try {
    const count = await getTotalPostCount();
    res.status(200).json({ count });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};