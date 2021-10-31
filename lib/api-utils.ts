import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dbConnect from "./db-connect";

import PostModel from "../models/post";
import ProjectModel from "../models/project";
import MetaModel from "../models/meta";

import type { Post, Project } from "../types";

// POSTS

/**
 * Returns sorted array of all `Post`s.
 */
export async function getAllPosts(): Promise<Post[]> {
  await dbConnect();

  const result = await PostModel.find({}).select("-__v").sort("-createdAt");
  const posts: Post[] = result.map((doc) => {
    const post: Post = doc.toObject();
    post._id = post._id.toString();
    post.createdAt = post.createdAt.toString();
    post.updatedAt = post.updatedAt.toString();

    return post;
  });

  return posts;
}

/**
 * Returns `Post` with provided `slug`.
 * @param slug Post path slug
 */
export async function getPostBySlug(slug: string): Promise<Post> {
  await dbConnect();

  const post: Post = await PostModel.findOne({ slug: slug }).lean();
  if (!post) return null;

  post._id = post._id.toString();
  post.createdAt = post.createdAt.toString();
  post.updatedAt = post.updatedAt.toString();

  return post;
}

/**
 * Returns `Post` array with `pinned: true`.
 */
export async function getPinnedPosts(): Promise<Post[]> {
  await dbConnect();

  const result = await PostModel.find({ pinned: true })
    .select("-__v")
    .sort("-createdAt");
  const posts: Post[] = result.map((doc) => {
    const post: Post = doc.toObject();
    post._id = post._id.toString();
    post.createdAt = post.createdAt.toString();
    post.updatedAt = post.updatedAt.toString();

    return post;
  });

  return posts;
}

/**
 * Returns `Post` array with provided `tag`.
 * @param tag Tag to filter posts by
 */
export async function getFilteredPosts(tag: string): Promise<Post[]> {
  await dbConnect();

  const result = await PostModel.find({ tags: tag })
    .select("-__v")
    .sort("-createdAt");
  const posts: Post[] = result.map((doc) => {
    const post: Post = doc.toObject();
    post._id = post._id.toString();
    post.createdAt = post.createdAt.toString();
    post.updatedAt = post.updatedAt.toString();

    return post;
  });

  return posts;
}

// PROJECTS

/**
 * Returns array of all `Project`s.
 */
export async function getAllProjects(): Promise<Project[]> {
  await dbConnect();

  const result = await ProjectModel.find({}).select("-__v").sort("-createdAt");
  const projects: Project[] = result.map((doc) => {
    const project: Project = doc.toObject();
    project._id = project._id.toString();
    project.createdAt = project.createdAt.toString();
    project.updatedAt = project.updatedAt.toString();

    return project;
  });

  return projects;
}

/**
 * Returns `Project` array with `pinned: true`.
 */
export async function getPinnedProjects(): Promise<Project[]> {
  await dbConnect();

  const result = await ProjectModel.find({ pinned: true })
    .select("-__v")
    .sort("-createdAt");
  const projects: Project[] = result.map((doc) => {
    const project: Project = doc.toObject();
    project._id = project._id.toString();
    project.createdAt = project.createdAt.toString();
    project.updatedAt = project.updatedAt.toString();

    return project;
  });

  return projects;
}

/**
 * Returns `Project` with provided id.
 * @param id Project id
 */
export async function getProjectById(id: string): Promise<Project> {
  await dbConnect();

  const project: Project = await ProjectModel.findById(id).lean();
  if (!project) return null;

  project._id = project._id.toString();
  project.createdAt = project.createdAt.toString();
  project.updatedAt = project.updatedAt.toString();

  return project;
}

// TAGS

/**
 * Returns all tags used in `Post[]`.
 */
export async function extractAllTags() {
  const posts = await getAllPosts();

  let tags: string[] = [];
  for (let p in posts) {
    for (let t in posts[p]?.tags) {
      tags.push(posts[p]?.tags[t]);
    }
  }
  const uniqueTags = [...new Set(tags)];

  return uniqueTags;
}

/**
 * Returns all tags.
 */
export async function getAllTags() {
  await dbConnect();

  const result = await MetaModel.findOne({});
  const tags = result?.tags || [];

  return tags;
}

// ABOUT

/**
 * Returns about page data.
 */
export async function getAboutContent() {
  await dbConnect();

  const result = await MetaModel.findOne({});
  const rawContent = result?.aboutContent || "";
  const { data, content } = matter(rawContent);
  const { hardSkills, softSkills } = data;
  const hardSkillsArray = Array.isArray(hardSkills)
    ? hardSkills
    : hardSkills?.split(",");
  const softSkillsArray = Array.isArray(softSkills)
    ? softSkills
    : softSkills?.split(",");

  return {
    content,
    hardSkills: hardSkillsArray,
    softSkills: softSkillsArray,
    raw: rawContent,
  };
}
