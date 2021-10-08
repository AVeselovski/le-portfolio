import Link from "next/link";

import JunkSlugs from "./JunkSlugs";

function JunkItem({ id, title, description, updatedAt, slugs = [] }) {
  const junkLink = `/junkyard/${id}`;
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
        <div className="mb-5">{description}</div>
        <footer className="flex justify-between items-center">
          <JunkSlugs slugs={slugs} />
          <Link href={junkLink}>
            <a className="text-blue-500">Read junk...</a>
          </Link>
        </footer>
      </div>
    </li>
  );
}

export default JunkItem;
