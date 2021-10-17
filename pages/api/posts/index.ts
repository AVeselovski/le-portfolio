import { readAllPosts } from "../../../lib/api-utils";

import type { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const data = readAllPosts();

    res.status(200).json({ success: true, data });
    return;
  }

  res.status(404).json({ success: false, message: "Bad request." });
}

export default handler;
