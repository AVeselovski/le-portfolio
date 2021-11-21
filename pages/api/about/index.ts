import { getSession } from "next-auth/client";

import dbConnect from "../../../lib/db-connect";
import Meta from "../../../models/meta";

import type { NextApiRequest, NextApiResponse } from "next";
import type { IMeta } from "../../../types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const metaObj = await Meta.findOne({});

      res.status(200).json({ success: true, data: metaObj.aboutContent });
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

  if (req.method === "PUT") {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ success: false, message: "Not authenticated!" });
      return;
    }

    try {
      const content: IMeta = req.body;
      const metaObj = await Meta.findOne({});

      if (metaObj) {
        metaObj.aboutContent = content.aboutContent;
        await metaObj.save();

        res.status(201).json({ success: true, data: metaObj.aboutContent });
        return;
      } else {
        const newMetaDoc = await Meta.create({ tags: [] }); // aboutContent created by default

        res.status(201).json({ success: true, data: newMetaDoc.aboutContent });
        return;
      }
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
