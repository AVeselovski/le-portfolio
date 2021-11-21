export interface IResponseError extends Error {
  info?: object;
  status?: number;
}

export interface IPost {
  _id?: string;
  title: string;
  slug: string;
  body: string;
  description: string;
  tags: string[];
  pinned: boolean;
  image?:
    | {
        src: string;
        height: number;
        width: number;
      }
    | undefined;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  tags: string[];
  sourceUrl: string;
  liveUrl: string;
  pinned: boolean;
  image?:
    | {
        src: string;
        height: number;
        width: number;
      }
    | undefined;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMeta {
  _id?: string;
  tags: string[];
  aboutContent: string;
}

export interface ITranslation {
  [key: string]: string;
}

export interface INotification {
  message: string | { [key: string]: string };
  status?: "error" | "warning" | "success";
}
