/*
 * UNUSED: Bunch of deprecated file system functions
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

import type { File } from "formidable";
import type { IPost, IProject } from "../types";

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
export function writeNewPost(post: IPost) {
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

    fs.writeFileSync(path.join(dir || dirPath, file.name || ""), data);
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
    const data: IProject[] = JSON.parse(fileData);
    return data;
  } catch (error) {
    console.log("Something went wrong!");
  }
}

/**
 * Returns `Project` array with `pinned: true`.
 */
export function readPinnedProjects() {
  const data = readAllProjects();

  return data?.filter((project) => project.pinned) || [];
}

// ABOUT

const aboutDataPath = path.join(process.cwd(), "data", "about.md");

/**
 * Returns about page data.
 */
export function readAbout() {
  const fileContents = fs.readFileSync(aboutDataPath, "utf-8");
  console.log(fileContents);
  const { data, content } = matter(fileContents);
  const { hardSkills, softSkills } = data;
  const hardSkillsArray = Array.isArray(hardSkills)
    ? hardSkills
    : hardSkills?.split(",");
  const softSkillsArray = Array.isArray(softSkills)
    ? softSkills
    : softSkills?.split(",");

  return { content, hardSkills: hardSkillsArray, softSkills: softSkillsArray };
}
