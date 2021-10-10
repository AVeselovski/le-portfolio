import { v4 as uuid } from "uuid";

import { writeNewJunk } from "../../../lib/api-utils";

function handler(req, res) {
  if (req.method === "POST") {
    const { title, description, pinned, tags } = req.body;

    if (
      !title ||
      title.trim() === "" ||
      !description ||
      description.trim() === ""
    ) {
      res.status(422).json({ success: false, message: "Invalid input." });
      return;
    }

    const newJunk = {
      id: uuid(),
      title,
      slug: "",
      description,
      body: "...",
      pinned: pinned || false,
      tags: tags || [],
      image: "junk-general.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    writeNewJunk(newJunk);

    res.status(201).json({ success: true, data: newJunk });
    return;
  }

  res.status(404).json({ success: false, message: "Bad request." });
}

export default handler;
