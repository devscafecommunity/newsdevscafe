import { getEventsSimplifiedByDateRecent } from "../../../utils/Events";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  try {
    const events = await getEventsSimplifiedByDateRecent();
    res.status(200).json(events);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};