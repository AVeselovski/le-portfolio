import mongoose from "mongoose";

const titleMinLength = 3;
const titleMaxLength = 60;
const descriptionMinLength = 10;
const descriptionMaxLength = 300;

const projectSchema = new mongoose.Schema(
  {
    /** Project title */
    title: {
      type: String,
      required: [true, "Project needs a title."],
      trim: true,
      minlength: [
        titleMinLength,
        `Project title must be at least ${titleMinLength} characters long.`,
      ],
      maxlength: [
        titleMaxLength,
        `Project title cannot exceed the length of ${titleMaxLength} characters.`,
      ],
    },

    /** Project description */
    description: {
      type: String,
      required: [true, "Project needs a description."],
      trim: true,
      minlength: [
        descriptionMinLength,
        `Project description must be at least ${descriptionMinLength} characters long.`,
      ],
      maxlength: [
        descriptionMaxLength,
        `Project description cannot exceed the length of ${descriptionMaxLength} characters.`,
      ],
    },

    /** Project tags */
    tags: { type: [String], default: [] },

    /** Project source URL (git) */
    sourceUrl: {
      type: String,
      required: [true, "Project needs source URL."],
      trim: true,
    },

    /** Project live URL (demo) */
    liveUrl: {
      type: String,
      required: [true, "Project needs live demo URL."],
      trim: true,
    },

    /** Project pinned/featured */
    pinned: {
      type: Boolean,
      default: true,
    },

    /** Project image data */
    image: {
      type: {
        src: String,
        height: Number,
        width: Number,
      },
      default: null,
    },
  },

  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
