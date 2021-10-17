import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useContext } from "react";

import I18nContext from "../../store/i18n";

import PostTags from "./PostTags";

function PostItem({ post = {} }) {
  const { t } = useContext(I18nContext);

  const { description, slug, tags = [], title } = post;
  const postLink = `/junkyard/${slug}`;
  // const humanReadableDate = new Date(updatedAt).toLocaleDateString("fi-FI", {
  //   day: "numeric",
  //   month: "numeric",
  //   year: "numeric",
  // });

  return (
    <li className="post-item">
      <div>
        <header className="mb-5">
          <Link href={postLink}>
            <a className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl">{title}</h2>
                {/* <span className="text-gray-500 text-sm">
                  {t.postLastUpdated}: {humanReadableDate}
                </span> */}
              </div>
              <div className="text-3xl md:text-4xl ml-2">&rarr;</div>
            </a>
          </Link>
        </header>
        <div className="markdown mb-6">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
        <footer className="flex justify-between items-center flex-wrap">
          <PostTags tags={tags} />
          <Link href={postLink}>
            <a className="post-link">{t.postRead}...</a>
          </Link>
        </footer>
      </div>
    </li>
  );
}

export default PostItem;
