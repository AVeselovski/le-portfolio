import mongoose from "mongoose";

import type { IMeta } from "../types";

const DEFAULT_CONTENT = `---
hardSkills: "JavaScript,Next.js,React"
softSkills: "Agile,Front-end"
---

Hello there!
`;

const metaSchema = new mongoose.Schema<IMeta>({
  /** All tags */
  tags: { type: [String], default: [] },

  /** About content */
  aboutContent: { type: String, default: DEFAULT_CONTENT },
});

export default mongoose.models.Meta ||
  mongoose.model<IMeta>("Meta", metaSchema);
