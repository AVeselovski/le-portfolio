import { getSession } from "next-auth/client";

import dbConnect from "../../../lib/db-connect";
import Post from "../../../models/post";

import { getAllPosts } from "../../../lib/api-utils";

import type { NextApiRequest, NextApiResponse } from "next";
import type { IPost } from "../../../types";

/**
 * Check uniqueness of provided slug.
 * @param slug `Post` slug
 */
async function slugIsUnique(slug: string) {
  const posts = await getAllPosts();
  const allSlugs = posts.map((s) => s.slug);

  return !allSlugs.some((s) => s === slug);
}

/**
 * Simple data validation.
 * @param fields Request body
 */
async function validate(fields: IPost) {
  if (
    !fields.title ||
    fields.title.trim() === "" ||
    !fields.slug ||
    fields.slug.trim() === "" ||
    !fields.body ||
    fields.body.trim() === "" ||
    !fields.description ||
    fields.description.trim() === ""
  ) {
    return {
      valid: false,
      errorMsg: "Invalid input. Required data missing.",
    };
  }

  const slugIsValid = await slugIsUnique(fields.slug);
  if (!slugIsValid) {
    return {
      valid: false,
      errorMsg: "Invalid input. Slug must be unique.",
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
      const { valid, errorMsg } = await validate(req.body);
      if (!valid) {
        res.status(422).json({
          success: false,
          message: errorMsg,
        });
        return;
      }

      const post = await Post.create(req.body);

      res.status(201).json({ success: true, data: post });
      return;
    } catch (error: any) {
      console.error("Heyyyy", error);
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
