import { readAllTags } from "../../../lib/api-utils";

function handler(req, res) {
  if (req.method === "GET") {
    const data = readAllTags();

    res.status(200).json({ success: true, data });
    return;
  }

  res.status(404).json({ success: false, message: "Bad request." });
}

export default handler;
