import Link from "next/link";

export function JunkTagSelector({ tags, selected, onSelect }) {
  const activeClasses = ["bg-indigo-400", "text-white"];
  const inactiveClasses = ["bg-gray-300", "text-gray-500"];

  function getClasses(tag) {
    return selected.includes(tag) ? activeClasses : inactiveClasses;
  }

  return (
    <div>
      {tags.map((tag) => (
        <button key={tag} onClick={onSelect.bind(null, tag)}>
          <span className={`tag ${getClasses(tag).join(" ")}`}>{tag}</span>
        </button>
      ))}
    </div>
  );
}

export default function JunkTags({ tags }) {
  return (
    <div>
      {tags.map((tag) => (
        <Link href={`/junkyard/s/${tag}`} key={tag}>
          <a>
            <span className="tag bg-indigo-400 text-white text-sm">{tag}</span>
          </a>
        </Link>
      ))}
    </div>
  );
}
