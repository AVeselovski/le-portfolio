import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  /** All tags */
  tags: { type: [String], default: [] },
});

export default mongoose.models.Tag || mongoose.model("Tag", tagSchema);
