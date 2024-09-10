import { getAuthorPosts, getAuthorDataSimplifyedByNickname } from "@/utils/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { nickname } = req.query;
  try {
    const author = await getAuthorDataSimplifyedByNickname(nickname as string);
    const posts = await getAuthorPosts(nickname as string);

    let data = {
        ...author,
        posts: posts
    }

    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};