import { readAllJunk } from "../../../services/server";

function handler(req, res) {
  if (req.method === "GET") {
    const data = readAllJunk();

    res.status(200).json({ success: true, data });
    return;
  }

  res.status(404).json({ success: false, message: "Bad request." });
}

export default handler;
