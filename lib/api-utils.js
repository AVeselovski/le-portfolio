import fs from "fs";
import path from "path";
import matter from "gray-matter";

// JUNK

const junkDir = path.join(process.cwd(), "data", "junk");

export function readJunk(fileName) {
  const slug = fileName.replace(/\.md$/, "");

  const filePath = path.join(junkDir, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  const junkData = {
    ...data,
    slug,
    content,
  };

  return junkData;
}

export function readAllJunk() {
  const junkFiles = fs.readdirSync(junkDir);
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

// export function readAllJunk() {
//   const filePath = path.join(process.cwd(), "data", "junk.json");
//   const fileData = fs.readFileSync(filePath);
//   const data = JSON.parse(fileData);

//   return data;
// }

// export function readJunkById(id) {
//   const data = readAllJunk();

//   return data.find((junk) => junk.id === id);
// }

// export function readJunkBySlug(slug) {
//   const data = readAllJunk();

//   return data.find((junk) => junk.slug === slug);
// }

export function readPinnedJunk() {
  const data = readAllJunk();

  return data.filter((junk) => junk.pinned);
}

export function readFilteredJunk(tag) {
  const data = readAllJunk();

  return data.filter((junk) => junk.tags.includes(tag));
}

export function writeNewJunk(junk) {
  const filePath = path.join(process.cwd(), "data", "junk.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  data.push(junk);

  fs.writeFileSync(filePath, JSON.stringify(data));
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
