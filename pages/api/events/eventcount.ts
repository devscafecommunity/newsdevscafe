import { getTotalEventCount } from "@/utils/Events";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  try {
    const count = await getTotalEventCount();
    res.status(200).json({ count });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};