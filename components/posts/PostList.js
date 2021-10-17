import PostItem from "./PostItem";

function PostList({ posts = [] }) {
  return (
    <ul>
      {posts.map((j, i) => (
        <PostItem key={`${i}-${j.slug}`} post={j} />
      ))}
    </ul>
  );
}

export default PostList;
