export const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    console.error(error);
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const unpacked = res.json().data;

  return unpacked;
};

// JUNK

export async function getAllJunk(url = "api/junk") {
  const data = await fetcher(url);

  return data;
}

// should be refactored to pass pinned as query param before use
export async function getJunkById(id) {
  const data = await getAllJunk();

  return data.find((junk) => junk.id === id);
}

// should be refactored to pass pinned as query param before use
export async function getPinnedJunk() {
  const data = await getAllJunk();

  return data.filter((junk) => junk.pinned);
}

// should be refactored to pass tag as query param before use
export async function getFilteredJunk(tag) {
  const data = await getAllJunk();

  return data.filter((junk) => junk.tags.includes(tag));
}

// TAGS

export async function getAllTags(url = "api/tags") {
  const data = await fetcher(url);

  return data;
}

// PROJECTS

export async function getAllProjects(url = "api/projects") {
  const data = await fetcher(url);

  return data;
}

// should be refactored to pass pinned as query param before use
export async function getPinnedProjects() {
  const data = await getAllProjects();

  return data.filter((project) => project.pinned);
}

export async function postNewJunk(junk) {
  const res = await fetch("/api/junk/new", {
    method: "POST",
    body: junk,
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    console.error(error);
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const data = await res.json();

  return data;
}
