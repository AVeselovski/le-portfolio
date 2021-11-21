import { getSession } from "next-auth/client";

import dbConnect from "../../../lib/db-connect";
import Post from "../../../models/post";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "PUT") {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ success: false, message: "Not authenticated!" });
      return;
    }

    try {
      const { id } = req.query;
      const post = await Post.findById(id).select("-__v");

      post.title = req.body.title;
      post.slug = req.body.slug;
      post.body = req.body.body;
      post.description = req.body.description;
      post.tags = req.body.tags;
      post.pinned = req.body.pinned;

      await post.save();

      res.status(201).json({ success: true, data: post });
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

  if (req.method === "DELETE") {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ success: false, message: "Not authenticated!" });
      return;
    }

    try {
      const { id } = req.query;
      const post = await Post.findOneAndDelete({ _id: id });

      res.status(204).json({ success: true, data: post });
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
