import Image from "next/image";

import JunkTags from "../JunkTags";

export default function JunkSummary({
  image = null,
  slug,
  tags,
  title,
  updatedAt,
}) {
  const humanReadableDate = new Date(updatedAt).toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const imagePath = `/images/junk/${slug}/${image?.src}`;
  const aspectRatio = image?.width / image?.height;
  const imageWidth = 752;
  const imageHeight = imageWidth / aspectRatio;

  return (
    <header className="mb-6">
      {!!image?.height && (
        <div className="mb-2">
          <Image
            alt={title}
            className="rounded-md"
            priority
            height={imageHeight}
            width={imageWidth}
            src={imagePath}
          />
        </div>
      )}
      <div className="mb-6">
        <JunkTags tags={tags} />
      </div>
      <div>
        <h2 className="text-4xl">{title}</h2>
        <span className="text-gray-500 text-sm">
          Last updated: {humanReadableDate}
        </span>
      </div>
    </header>
  );
}
