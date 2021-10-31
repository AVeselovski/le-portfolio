import type { ResponseError, Post, Project } from "../types";

/**
 * "To hell with it, I tried" - type of solution for Next i18n sub-path
 * routing clientside issues with api routes.
 * @param url Api route path
 */
function getUrl(url: string) {
  let baseUrl: string;
  if (typeof window !== "undefined") {
    baseUrl = window.location.origin;
  }

  return `${baseUrl}/${url}`;
}

export const fetcher = async (url: string) => {
  const res = await fetch(getUrl(url));

  if (!res.ok) {
    const error: ResponseError = new Error(
      "An error occurred while fetching the data."
    );
    console.error(error);
    error.info = await res.json();
    error.status = res.status;

    throw error;
  }

  const { data } = await res.json();

  return data;
};

// POSTS

/**
 * Returns all `Post`s.
 * @param url API path
 */
export async function getAllPosts(url = "api/posts") {
  const data: Post[] = await fetcher(url);

  return data;
}

/**
 * API POST request to save `Post` object.
 * @param post New `Post` object
 */
export async function createNewPost(post: Post) {
  const res = await fetch("/api/posts/new", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error: ResponseError = new Error(
      "An error occurred while fetching the data."
    );
    console.error(error);
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
}

/**
 * API PUT request to update `Post`.
 * @param post Updated `Post` object
 */
export async function updatePost(post: Post) {
  const res = await fetch(`/api/posts/${post._id}`, {
    method: "PUT",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error: ResponseError = new Error(
      "An error occurred while fetching the data."
    );
    console.error(error);
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
}

/**
 * API DELETE request to delete `Post`.
 * @param id `Post` id
 */
export async function deletePost(id: string) {
  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error: ResponseError = new Error(
      "An error occurred while fetching the data."
    );
    console.error(error);
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
}

// PROJECTS

/**
 * API GET request to fetch all projects.
 * @param url API path
 */
export async function getAllProjects(url = "api/projects") {
  const data = await fetcher(url);

  return data;
}

/**
 * API POST request to save `Project` object.
 * @param project New `Project` object
 */
export async function createNewProject(project: Project) {
  const res = await fetch("/api/projects/new", {
    method: "POST",
    body: JSON.stringify(project),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error: ResponseError = new Error(
      "An error occurred while fetching the data."
    );
    console.error(error);
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
}

/**
 * API PUT request to update `Project`.
 * @param project Updated `Project` object
 */
export async function updateProject(project: Project) {
  const res = await fetch(`/api/projects/${project._id}`, {
    method: "PUT",
    body: JSON.stringify(project),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error: ResponseError = new Error(
      "An error occurred while fetching the data."
    );
    console.error(error);
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
}

/**
 * API DELETE request to delete `Project`.
 * @param id `Project` id
 */
export async function deleteProject(id: string) {
  const res = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error: ResponseError = new Error(
      "An error occurred while fetching the data."
    );
    console.error(error);
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
}

// TAGS

/**
 * API GET request to fetch all available tags.
 * @param url API path
 */
export async function getAllTags(url = "api/tags") {
  const data = await fetcher(url);

  return data;
}

/**
 * API POST request to save `Meta` object `tags` field.
 * @param tag New tag to add to `Meta` object
 */
export async function createNewTag(tag: string) {
  const res = await fetch("/api/tags/new", {
    method: "POST",
    body: JSON.stringify(tag),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error: ResponseError = new Error(
      "An error occurred while fetching the data."
    );
    console.error(error);
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
}

/**
 * API PUT request to update `Meta` object `tags` field.
 * @param tags Updated tags to add to `Meta` object
 */
export async function updateTags(tags: string[]) {
  const res = await fetch("/api/tags", {
    method: "PUT",
    body: JSON.stringify(tags),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error: ResponseError = new Error(
      "An error occurred while fetching the data."
    );
    console.error(error);
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
}

// ABOUT

/**
 * API PUT request to save `Meta` object `aboutContent` field.
 * @param content Updated `Meta` content object
 */
export async function updateAbout(content: object) {
  const res = await fetch("/api/about", {
    method: "PUT",
    body: JSON.stringify(content),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error: ResponseError = new Error(
      "An error occurred while fetching the data."
    );
    console.error(error);
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
}

// USER

/**
 * API POST request to create `User`.
 * @param user New `User` object
 */
export async function createUser(user: object) {
  const res = await fetch("/api/auth/create", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error: ResponseError = new Error(
      "An error occurred while fetching the data."
    );
    console.error(error);
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
}
