import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    res.status(418).json({ success: false, message: "I'm a teapot." });
    return;

    /**** For creating encrypted master user ****/
    /*
    try {
      const user = req.body;
      const { username, password } = user;

      if (
        !username ||
        username.length < 4 ||
        !password ||
        password.trim().length < 8
      ) {
        res.status(422).json({ success: false, message: "Invalid input." });
        return;
      }

      const existingUser = await User.findOne({ username });

      if (existingUser) {
        res
          .status(422)
          .json({ success: false, message: "User already exists!" });
        return;
      }

      const newUser = await User.create({ username, password });

      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message:
          error.errors?.title?.message || error._message || error.message,
      });
      return;
    }
    */
  }

  res.status(404).json({ success: false, message: "Bad request." });
}

export default handler;
