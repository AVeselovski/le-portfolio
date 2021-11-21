import Image from "next/image";

import styles from "./PostSummary.module.css";

import { LinkTags } from "../../ui/Tags";

import type { IPost } from "../../../types";

type Props = {
  image: IPost["image"];
  slug: string;
  tags: string[];
  title: string;
};

function PostSummary({ image, slug, tags, title }: Props) {
  // const humanReadableDate = new Date(updatedAt).toLocaleDateString("fi-FI", {
  //   day: "numeric",
  //   month: "numeric",
  //   year: "numeric",
  // });
  const imagePath = `/images/posts/${slug}/${image?.src}`;
  const aspectRatio = image && image.width / image.height;
  const imageWidth = 752;
  const imageHeight = aspectRatio && imageWidth / aspectRatio;

  return (
    <header className="mb-10">
      {!!image?.height && (
        <div className={styles.postImage}>
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
          <LinkTags tags={tags} />
        </div>
        {/* <span className="text-gray-500 text-sm">
          Last updated: {humanReadableDate}
        </span> */}
      </div>
    </header>
  );
}

export default PostSummary;
