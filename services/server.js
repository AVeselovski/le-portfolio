import fs from "fs";
import path from "path";

// JUNK

export function readAllJunk() {
  const filePath = path.join(process.cwd(), "data", "junk.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
}

export function readJunkById(id) {
  const data = readAllJunk();

  return data.find((junk) => junk.id === id);
}

export function readPinnedJunk() {
  const data = readAllJunk();

  return data.filter((junk) => junk.pinned);
}

export function readFilteredJunk(slug) {
  const data = readAllJunk();

  return data.filter((junk) => junk.slugs.includes(slug));
}

export function writeNewJunk(junk) {
  const filePath = path.join(process.cwd(), "data", "junk.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  data.push(junk);

  fs.writeFileSync(filePath, JSON.stringify(data));
}

// SLUGS

export function readAllSlugs() {
  const filePath = path.join(process.cwd(), "data", "slugs.json");
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
