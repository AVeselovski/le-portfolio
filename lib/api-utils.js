import fs from "fs";
import path from "path";
import matter from "gray-matter";

// JUNK

const junkDataDir = path.join(process.cwd(), "data", "junk");

/**
 * Creates a directory with the provided slug `public/images/junk/${slug}/`
 * and stores the image file in said directory.
 * @param {*} file Image file to store.
 * @param {string} slug Junk (post) slug. Creates directory with that name.
 */
export async function saveJunkImage(file, slug) {
  const data = fs.readFileSync(file.path);
  const dirPath = path.join(process.cwd(), "public", "images", "junk", slug);
  fs.mkdir(dirPath, { recursive: true }, (err, dir) => {
    if (err) throw err;

    fs.writeFileSync(path.join(dir || dirPath, file.name), data);
    fs.unlinkSync(file.path);
  });

  return;
}

/**
 * Reads individual markdown files from file system and makes necessary data transformations.
 *
 * @param {string} fileName Name of file to read.
 */
export function readJunk(fileName) {
  const slug = fileName.replace(/\.md$/, "");

  const filePath = path.join(junkDataDir, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const { tags, ...rest } = data;
  const tagsArray = Array.isArray(tags) ? tags : tags?.split(",");

  const junkData = {
    ...rest,
    slug,
    content,
    tags: tagsArray,
  };

  return junkData;
}

/**
 * Reads all markdown files and returns sorted data array.
 */
export function readAllJunk() {
  const junkFiles = fs.readdirSync(junkDataDir);
  const allJunk = junkFiles.map((file) => readJunk(file));
  const sortedJunk = allJunk.sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );

  return sortedJunk;
}

export function readJunkBySlug(slug) {
  const data = readJunk(slug);

  return data;
}

export function readPinnedJunk() {
  const data = readAllJunk();

  return data.filter((junk) => junk.pinned);
}

export function readFilteredJunk(tag) {
  const data = readAllJunk();

  return data.filter((junk) => junk.tags.includes(tag));
}

/**
 * Stores junk (post) data in the file system.
 * @param {*} junk Junk (post) data.
 */
export function writeNewJunk(junk) {
  const filePath = path.join(process.cwd(), "data", "junk", `${junk.slug}.md`);
  const { body, ...rest } = junk;
  const data = matter.stringify(body, rest);

  fs.writeFileSync(filePath, data);
}

// TAGS

export function readAllTags() {
  const filePath = path.join(process.cwd(), "data", "tags.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
}

// PROJECTS

export function readAllProjects() {
  const filePath = path.join(process.cwd(), "data", "projects.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
}

export function readPinnedProjects() {
  const data = readAllProjects();

  return data.filter((project) => project.pinned);
}

// ABOUT

const aboutDataPath = path.join(process.cwd(), "data", "about.md");

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
