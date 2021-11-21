import mongoose from "mongoose";

import type { IPost } from "../types";

const titleMinLength = 3;
const titleMaxLength = 60;
const bodyMinLength = 10;
const descriptionMinLength = 10;
const descriptionMaxLength = 200;

const postSchema = new mongoose.Schema<IPost>(
  {
    /** Post title */
    title: {
      type: String,
      required: [true, "Post needs a title."],
      trim: true,
      minlength: [
        titleMinLength,
        `Post title must be at least ${titleMinLength} characters long.`,
      ],
      maxlength: [
        titleMaxLength,
        `Post title cannot exceed the length of ${titleMaxLength} characters.`,
      ],
    },

    /** Post slug */
    slug: {
      type: String,
      required: [true, "Post needs a slug."],
      unique: true,
      trim: true,
      minlength: [
        titleMinLength,
        `Post slug must be at least ${titleMinLength} characters long.`,
      ],
      maxlength: [
        titleMaxLength,
        `Post slug cannot exceed the length of ${titleMaxLength} characters.`,
      ],
    },

    /** Post body/content */
    body: {
      type: String,
      required: [true, "Post needs content."],
      trim: true,
      minlength: [
        bodyMinLength,
        `Post body must be at least ${bodyMinLength} characters long.`,
      ],
    },

    /** Post description/excerpt */
    description: {
      type: String,
      required: [true, "Post needs a description."],
      trim: true,
      minlength: [
        descriptionMinLength,
        `Post description must be at least ${descriptionMinLength} characters long.`,
      ],
      maxlength: [
        descriptionMaxLength,
        `Post description cannot exceed the length of ${descriptionMaxLength} characters.`,
      ],
    },

    /** Post tags */
    tags: { type: [String], default: [] },

    /** Post pinned/featured */
    pinned: {
      type: Boolean,
      default: true,
    },

    /** Post image data */
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

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", postSchema);
