import { getTotalPostCount } from "@/utils/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const count = await getTotalPostCount();
    res.status(200).json({ count });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};