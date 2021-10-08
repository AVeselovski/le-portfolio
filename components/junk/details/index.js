import JunkSummary from "./JunkSummary";
import JunkContent from "./JunkContent";
import JunkSlugs from "../JunkSlugs";

export default function JunkDetails({
  title,
  description,
  image,
  updatedAt,
  slugs = [],
}) {
  return (
    <>
      <JunkSummary title={title} image={image} updatedAt={updatedAt} />
      <JunkContent content={description} />
      <JunkSlugs slugs={slugs} />
    </>
  );
}
