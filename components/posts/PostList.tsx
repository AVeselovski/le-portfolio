import PostItem from "./PostItem";

import type { IPost } from "../../types";

function PostList({ posts = [] }: { posts: IPost[] }) {
  return (
    <ul>
      {posts.map((j, i) => (
        <PostItem key={`${i}-${j.slug}`} post={j} />
      ))}
    </ul>
  );
}

export default PostList;
