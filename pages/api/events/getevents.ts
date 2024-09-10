import { getEventsSimplifiedByDateRecent, getEvents } from "../../../utils/Events";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const events = await getEventsSimplifiedByDateRecent();
    res.status(200).json(events);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};