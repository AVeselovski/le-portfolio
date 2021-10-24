import dbConnect from "../../../lib/db-connect";
import Tag from "../../../models/tag";

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
      errorMsg: "Invalid input. Tag must be unique.",
    };
  }

  return { valid: true };
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const newTag: string = req.body;
      const tag = await Tag.findOne({});

      if (tag) {
        const { valid, errorMsg } = tagIsUnique(req.body, tag.tags);
        if (!valid) {
          res.status(422).json({
            success: false,
            message: errorMsg,
          });
          return;
        }

        tag.tags.push(newTag);
        await tag.save();

        res.status(201).json({ success: true, data: tag.tags });
        return;
      } else {
        const newTagsDoc = await Tag.create({ tags: [newTag] });

        res.status(201).json({ success: true, data: newTagsDoc.tags });
        return;
      }
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
