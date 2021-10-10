import JunkSummary from "./JunkSummary";
import JunkContent from "./JunkContent";
import JunkTags from "../JunkTags";

export default function JunkDetails({ junk }) {
  return (
    <article>
      <JunkSummary
        image={junk.image}
        slug={junk.slug}
        title={junk.title}
        updatedAt={junk.updatedAt}
      />
      <JunkContent content={junk.content} slug={junk.slug} />
      <JunkTags tags={junk.tags} />
    </article>
  );
}
