import Link from "next/link";
import { useContext } from "react";

import I18nContext from "../../store/i18n";

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

export default function JunkTags({ tags, withAll = false }) {
  const { t } = useContext(I18nContext);

  return (
    <div className="tag-container">
      {withAll && (
        <Link href={`/junkyard`} key="all">
          <a>
            <span className="tag bg-white border border-indigo-400 text-indigo-400">
              {t.blogShowAll}...
            </span>
          </a>
        </Link>
      )}
      {tags.map((tag) => (
        <Link href={`/junkyard/s/${tag}`} key={tag}>
          <a>
            <span className="tag bg-indigo-400 border border-indigo-400 text-white">
              {tag}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
}
