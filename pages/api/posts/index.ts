import dbConnect from "../../../lib/db-connect";
import Post from "../../../models/post";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const posts = await Post.find({}).select("-__v");

      res.status(200).json({ success: true, data: posts });
      return;
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message:
          error.errors?.title?.message || error._message || error.message,
      });
      return;
    }
  }

  res.status(404).json({ success: false, message: "Bad request." });
}

export default handler;
