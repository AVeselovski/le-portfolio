import { getSession } from "next-auth/client";

import dbConnect from "../../../lib/db-connect";
import Meta from "../../../models/meta";

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Check uniqueness of provided tag.
 * @param tag Tag
 */
function tagIsUnique(tag: string, tags: string[]) {
  const unique = !tags.some((t) => t === tag);

  if (!unique) {
    return {
      valid: false,
      errorMsg: "Invalid input. Tag must be unique!",
    };
  }

  return { valid: true };
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ success: false, message: "Not authenticated!" });
      return;
    }

    try {
      const newTag: string = req.body;
      const metaObj = await Meta.findOne({});

      if (metaObj) {
        const { valid, errorMsg } = tagIsUnique(req.body, metaObj.tags);
        if (!valid) {
          res.status(422).json({
            success: false,
            message: errorMsg,
          });
          return;
        }

        metaObj.tags.push(newTag);
        await metaObj.save();

        res.status(201).json({ success: true, data: metaObj.tags });
        return;
      } else {
        const newMetaDoc = await Meta.create({ tags: [newTag] });

        res.status(201).json({ success: true, data: newMetaDoc.tags });
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
