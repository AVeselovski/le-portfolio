import { v4 as uuid } from "uuid";
import formidable from "formidable";

import {
  writeNewJunk,
  saveJunkImage,
  readAllJunk,
} from "../../../lib/api-utils";

// disable automatic parsing to consume the stream instead
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Check uniqueness of provided slug.
 * @param {string} slug
 */
function slugIsUnique(slug) {
  const junk = readAllJunk();

  return !junk.some((j) => j.slug === slug);
}

/**
 * Validates submitted data.
 * @param {*} fields
 */
function validate(fields) {
  if (
    !fields.title ||
    fields.title.trim() === "" ||
    !fields.description ||
    fields.description.trim() === "" ||
    fields.description.length < 5 ||
    !fields.body ||
    fields.body.length < 10
  ) {
    return {
      valid: false,
      errorMsg: "Invalid input. Required data missing.",
    };
  }

  if (!slugIsUnique(fields.slug)) {
    return {
      valid: false,
      errorMsg: "Invalid input. Slug must be unique.",
    };
  }

  return { valid: true };
}

function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      if (err) {
        console.log(err.message);
        res.status(422).json({
          success: false,
          message: err.message,
        });
        return;
      }

      const { valid, errorMsg } = validate(fields);
      if (!valid) {
        res.status(422).json({
          success: false,
          message: errorMsg,
        });
        return;
      }

      const { title, slug, description, body, pinned, tags, image } = fields;
      const imageData = { ...JSON.parse(image), src: files?.file?.name || "" };
      const newJunk = {
        id: uuid(),
        title,
        slug,
        description,
        body,
        pinned: JSON.parse(pinned) || false,
        tags: tags || [],
        image: imageData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (files?.file) {
        await saveJunkImage(files.file, slug);
      }

      writeNewJunk(newJunk);

      res.status(201).json({ success: true, data: newJunk });

      return;
    });

    return;
  }

  res.status(404).json({ success: false, message: "Bad request." });
}

export default handler;
