import Link from "next/link";
import ReactMarkdown from "react-markdown";

import JunkTags from "./JunkTags";

function JunkItem({ junk }) {
  const { description, slug, tags = [], title, updatedAt } = junk;
  const junkLink = `/junkyard/${slug}`;
  const humanReadableDate = new Date(updatedAt).toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <li className="post-item">
      <div>
        <header className="mb-5">
          <Link href={junkLink}>
            <a className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl">{title}</h2>
                <span className="text-gray-500 text-sm">
                  Last updated: {humanReadableDate}
                </span>
              </div>
              <div className="text-3xl md:text-4xl ml-2">&rarr;</div>
            </a>
          </Link>
        </header>
        <div className="markdown mb-6">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
        <footer className="flex justify-between items-center flex-wrap">
          <JunkTags tags={tags} />
          <Link href={junkLink}>
            <a className="post-link">Read junk...</a>
          </Link>
        </footer>
      </div>
    </li>
  );
}

export default JunkItem;
