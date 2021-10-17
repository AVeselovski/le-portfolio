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
    <header className="mb-10">
      {!!image?.height && (
        <div className="post-image mb-4">
          <Image
            alt={title}
            // priority
            height={imageHeight}
            width={imageWidth}
            src={imagePath}
          />
        </div>
      )}

      <div>
        <h1 className="text-4xl">{title}</h1>
        <div className="mt-4">
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
