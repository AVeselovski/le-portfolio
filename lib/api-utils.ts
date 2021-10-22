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

  const postData: Post = {
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
 * Returns sorted array of all `Post`s.
 */
export function readAllPosts() {
  const postsFiles = fs.readdirSync(postsDataDir);
  const allPosts = postsFiles.map((file) => readPost(file));
  const sortedPosts = allPosts.sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );

  return sortedPosts;
}

/**
 * Returns `Post` with provided `slug`.
 * @param slug Post path slug
 */
export function readPostBySlug(slug: string) {
  let data: Post;
  try {
    data = readPost(slug);
  } catch (error) {
    return null;
  }

  return data;
}

/**
 * Returns `Post` array with `pinned: true`.
 */
export function readPinnedPosts() {
  const data = readAllPosts();

  return data.filter((post) => post.pinned);
}

/**
 * Returns `Post` array with provided `tag`.
 * @param tag Tag to filter posts by
 */
export function readFilteredPosts(tag: string) {
  const data = readAllPosts();

  return data.filter((post) => post.tags.includes(tag));
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

// TAGS

/**
 * Returns all tags.
 */
export function readAllTags() {
  const filePath = path.join(process.cwd(), "data", "tags.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const data: string[] = JSON.parse(fileData);

  return data;
}

// PROJECTS

const projectsDataPath = path.join(
  process.cwd(),
  "data",
  "projects",
  "projects.json"
);

// /**
//  * Reads individual project markdown files from file system and makes necessary data transformations.
//  * @param fileName File to read
//  */
// export function readProject(fileName: string) {
//   const slug = fileName.replace(/\.md$/, "");

//   const filePath = path.join(projectsDataDir, `${slug}.md`);
//   const fileContents = fs.readFileSync(filePath, "utf-8");
//   const { data, content } = matter(fileContents);
//   const { tags } = data;
//   const tagsArray: string[] = Array.isArray(tags) ? tags : tags?.split(",");

//   const projectData: Project = {
//     title: data.title,
//     slug,
//     description: data.description,
//     tags: tagsArray,
//     pinned: data.pinned,
//     image: data.image,
//     createdAt: data.createdAt,
//     body: content,
//   };

//   return projectData;
// }

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

// /**
//  * Returns `Project` with provided `slug`.
//  * @param slug Post slug
//  */
// export function readProjectBySlug(slug: string) {
//   let data: Post;
//   try {
//     data = readProject(slug);
//   } catch (error) {
//     return null;
//   }

//   return data;
// }

/**
 * Returns `Project` array with `pinned: true`.
 */
export function readPinnedProjects() {
  const data = readAllProjects();

  return data.filter((project) => project.pinned);
}

// ABOUT

const aboutDataPath = path.join(process.cwd(), "data", "about.md");

/**
 * Returns about page data.
 */
export function readAbout() {
  const fileContents = fs.readFileSync(aboutDataPath, "utf-8");
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
