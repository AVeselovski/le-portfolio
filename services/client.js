export const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const unpacked = res.json().data;

  return unpacked;
};

// JUNK

export async function getAllJunk() {
  const data = await fetcher("api/junk");

  return data;
}

export async function getJunkById(id) {
  const data = await getAllJunk();

  return data.find((junk) => junk.id === id);
}

export async function getPinnedJunk() {
  const data = await getAllJunk();

  return data.filter((junk) => junk.pinned);
}

export async function getFilteredJunk(slug) {
  const data = await getAllJunk();

  return data.filter((junk) => junk.slugs.includes(slug));
}

// SLUGS

export async function getAllSlugs() {
  const data = await fetcher("api/slugs");

  return data;
}

// PROJECTS

export async function getAllProjects() {
  const data = await fetcher("api/projects");

  return data;
}

export async function getPinnedProjects() {
  const data = await getAllProjects();

  return data.filter((project) => project.pinned);
}

export async function postNewJunk(junk) {
  const response = await fetch("/api/junk/new", {
    method: "POST",
    body: JSON.stringify(junk),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}
