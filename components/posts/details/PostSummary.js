import Image from "next/image";

import PostTags from "../PostTags";

function PostSummary({
  image = null,
  slug,
  tags,
  title,
  // updatedAt,
}) {
  // const humanReadableDate = new Date(updatedAt).toLocaleDateString("fi-FI", {
  //   day: "numeric",
  //   month: "numeric",
  //   year: "numeric",
  // });
  const imagePath = `/images/posts/${slug}/${image?.src}`;
  const aspectRatio = image?.width / image?.height;
  const imageWidth = 752;
  const imageHeight = imageWidth / aspectRatio;

  return (
    <header className="mb-8">
      {!!image?.height && (
        <div className="mb-2">
          <Image
            alt={title}
            className="rounded-md"
            // priority
            height={imageHeight}
            width={imageWidth}
            src={imagePath}
          />
        </div>
      )}

      <div>
        <h2 className="text-4xl">{title}</h2>
        <div className="mt-3">
          <PostTags tags={tags} />
        </div>
        {/* <span className="text-gray-500 text-sm">
          Last updated: {humanReadableDate}
        </span> */}
      </div>
    </header>
  );
}

export default PostSummary;
