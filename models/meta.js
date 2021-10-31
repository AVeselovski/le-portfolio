import mongoose from "mongoose";

const DEFAULT_CONTENT = `---
hardSkills: "JavaScript,Next.js,React"
softSkills: "Agile,Front-end"
---

Hello there!
`;

const metaSchema = new mongoose.Schema({
  /** All tags */
  tags: { type: [String], default: [] },

  /** About content */
  aboutContent: { type: String, default: DEFAULT_CONTENT },
});

export default mongoose.models.Meta || mongoose.model("Meta", metaSchema);
