import { getSession } from "next-auth/client";

import dbConnect from "../../../lib/db-connect";
import ProjectModel from "../../../models/project";

import type { NextApiRequest, NextApiResponse } from "next";
import type { Project } from "../../../types";

/**
 * Simple data validation.
 * @param fields Request body
 */
function validate(fields: Project) {
  if (
    !fields.title ||
    fields.title.trim() === "" ||
    !fields.description ||
    fields.description.trim() === "" ||
    !fields.tags.length ||
    !fields.sourceUrl ||
    !fields.liveUrl
  ) {
    return {
      valid: false,
      errorMsg: "Invalid input. Required data missing.",
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
      const { valid, errorMsg } = validate(req.body);
      if (!valid) {
        res.status(422).json({
          success: false,
          message: errorMsg,
        });
        return;
      }

      const project = await ProjectModel.create(req.body);

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
}

export default handler;
