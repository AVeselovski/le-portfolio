import PostSummary from "./PostSummary";
import PostContent from "./PostContent";

function PostDetails({ post }) {
  return (
    <article>
      <PostSummary
        image={post.image}
        slug={post.slug}
        tags={post.tags}
        title={post.title}
        // updatedAt={post.updatedAt}
      />
      <PostContent content={post.body} slug={post.slug} />
    </article>
  );
}

export default PostDetails;
