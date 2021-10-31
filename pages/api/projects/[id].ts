import { getSession } from "next-auth/client";

import dbConnect from "../../../lib/db-connect";
import Project from "../../../models/project";

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
      const project = await Project.findById(id).select("-__v");

      project.title = req.body.title;
      project.description = req.body.description;
      project.tags = req.body.tags;
      project.sourceUrl = req.body.sourceUrl;
      project.liveUrl = req.body.liveUrl;
      project.pinned = req.body.pinned;

      await project.save();

      res.status(201).json({ success: true, data: project });
      return;
    } catch (error) {
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
      const project = await Project.findOneAndDelete({ _id: id });

      res.status(204).json({ success: true, data: project });
      return;
    } catch (error) {
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
