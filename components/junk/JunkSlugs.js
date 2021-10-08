import Link from "next/link";

export function JunkSlugSelector({ slugs, selected, onSelect }) {
  const activeClasses = ["bg-indigo-400", "text-white"];
  const inactiveClasses = ["bg-gray-300", "text-gray-500"];

  function getClasses(slug) {
    return selected.includes(slug) ? activeClasses : inactiveClasses;
  }

  return (
    <div>
      {slugs.map((slug) => (
        <button key={slug} onClick={onSelect.bind(null, slug)}>
          <span className={`slug ${getClasses(slug).join(" ")}`}>{slug}</span>
        </button>
      ))}
    </div>
  );
}

export default function JunkSlugs({ slugs }) {
  return (
    <div>
      {slugs.map((slug) => (
        <Link href={`/junkyard/s/${slug}`} key={slug}>
          <a>
            <span className="slug bg-indigo-400 text-white text-sm">
              {slug}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
}
