export interface ResponseError extends Error {
  info?: object;
  status?: number;
}

export interface Post {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  pinned: boolean;
  image: {
    src?: string;
    height?: number;
    width?: number;
  };
  createdAt: string;
  body: string;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  pinned: boolean;
  image: {
    src?: string;
    height?: number;
    width?: number;
  };
  createdAt: string;
  body: string;
}