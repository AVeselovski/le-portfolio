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
    <li className="border border-gray-200 rounded-md py-3 px-5 mb-3">
      <div>
        <header className="mb-5">
          <Link href={junkLink}>
            <a className="flex items-start justify-between">
              <div>
                <h2 className="text-4xl">{title}</h2>
                <span className="text-gray-500 text-sm">
                  Last updated: {humanReadableDate}
                </span>
              </div>
              <div className="text-4xl">&rarr;</div>
            </a>
          </Link>
        </header>
        <div className="mb-5">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
        <footer className="flex justify-between items-center">
          <JunkTags tags={tags} />
          <Link href={junkLink}>
            <a className="text-blue-500">Read junk...</a>
          </Link>
        </footer>
      </div>
    </li>
  );
}

export default JunkItem;
