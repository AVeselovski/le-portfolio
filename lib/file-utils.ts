/*
 * UNUSED: Bunch of deprecated file system functions
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

import type { File } from "formidable";
import type { Post, Project } from "../types";

// POSTS

const postsDataDir = path.join(process.cwd(), "data", "posts");

/**
 * Reads individual post markdown files from file system and makes necessary data transformations.
 * @param fileName File to read
 */
export function readPost(fileName: string) {
  const slug = fileName.replace(/\.md$/, "");

  const filePath = path.join(postsDataDir, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const { tags } = data;
  const tagsArray: string[] = Array.isArray(tags) ? tags : tags?.split(",");

  const postData = {
    title: data.title,
    slug,
    description: data.description,
    tags: tagsArray,
    pinned: data.pinned,
    image: data.image,
    createdAt: data.createdAt,
    body: content,
  };

  return postData;
}

/**
 * Stores `Post` data in the file system.
 * @param post New post data.
 */
export function writeNewPost(post: Post) {
  const filePath = path.join(process.cwd(), "data", "posts", `${post.slug}.md`);
  const { body, ...rest } = post;
  const data = matter.stringify(body, rest);

  fs.writeFileSync(filePath, data);
}

/**
 * Creates a directory with the provided slug `public/images/posts/${slug}/`
 * and stores the image file in the directory.
 * @param file Image file to store
 * @param slug Post slug. Creates directory with that name
 */
export async function savePostImage(file: File, slug: string) {
  const data = fs.readFileSync(file.path);
  const dirPath = path.join(process.cwd(), "public", "images", "posts", slug);
  fs.mkdir(dirPath, { recursive: true }, (err, dir) => {
    if (err) throw err;

    fs.writeFileSync(path.join(dir || dirPath, file.name), data);
    fs.unlinkSync(file.path);
  });

  return;
}

// PROJECTS

const projectsDataPath = path.join(
  process.cwd(),
  "data",
  "projects",
  "projects.json"
);

/**
 * Returns array of all `Project`s.
 */
export function readAllProjects() {
  const filePath = projectsDataPath;
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const data: Project[] = JSON.parse(fileData);
    return data;
  } catch (error) {
    console.log("Fug");
  }
}

/**
 * Returns `Project` array with `pinned: true`.
 */
export function readPinnedProjects() {
  const data = readAllProjects();

  return data.filter((project) => project.pinned);
}
