import JunkSummary from "./JunkSummary";
import JunkContent from "./JunkContent";

export default function JunkDetails({ junk }) {
  return (
    <article>
      <JunkSummary
        image={junk.image}
        slug={junk.slug}
        tags={junk.tags}
        title={junk.title}
        updatedAt={junk.updatedAt}
      />
      <JunkContent content={junk.content} slug={junk.slug} />
    </article>
  );
}
