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
export async function postNewPost(post: Post) {
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

// PROJECTS

export async function getAllProjects(url = "api/projects") {
  const data = await fetcher(url);

  return data;
}

/**
 * API POST request to save `Post` object.
 * @param post New `Post` object
 */
export async function postNewProject(project: Project) {
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

// TAGS

export async function getAllTags(url = "api/tags") {
  const data = await fetcher(url);

  return data;
}

/**
 * API POST request to save `Post` object.
 * @param post New `Post` object
 */
export async function postNewTag(tag: string) {
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
