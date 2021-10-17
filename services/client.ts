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
 * API POST request to save `Post`object.
 * @param post New post object
 */
export async function postNewPost(post: any) {
  const res = await fetch("/api/posts/new", {
    method: "POST",
    body: post,
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

  const data = await res.json();

  return data;
}

// // should be refactored to pass slug as query param before use
// export async function getPostBySlug(slug: string) {
//   const data = await getAllPosts();

//   return data.find((post) => post.slug === slug);
// }
// // should be refactored to pass pinned as query param before use
// export async function getPinnedPosts() {
//   const data = await getAllPosts();

//   return data.filter((post) => post.pinned);
// }
// // should be refactored to pass tag as query param before use
// export async function getFilteredPosts(tag: string) {
//   const data = await getAllPosts();

//   return data.filter((post) => post.tags.includes(tag));
// }

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

// // should be refactored to pass pinned as query param before use
// export async function getPinnedProjects() {
//   const data: Project[] = await getAllProjects();

//   return data.filter((project) => project.pinned);
// }
