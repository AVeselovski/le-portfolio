export interface ResponseError extends Error {
  info?: object;
  status?: number;
}

export interface Post {
  _id?: string;
  title: string;
  slug: string;
  body: string;
  description: string;
  tags: string[];
  pinned: boolean;
  image: {
    src?: string;
    height?: number;
    width?: number;
  } | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  tags: string[];
  sourceUrl: string;
  liveUrl: string;
  pinned: boolean;
  image: {
    src?: string;
    height?: number;
    width?: number;
  } | null;
  createdAt?: string;
  updatedAt?: string;
}
