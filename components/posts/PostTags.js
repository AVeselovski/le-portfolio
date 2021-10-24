import Link from "next/link";
import ReactDOM from "react-dom";
import { useContext, useRef, useState } from "react";

import I18nContext from "../../store/i18n";

export function PostTagSelector({ tags, selected, onSelect, onSubmit }) {
  const [showInput, setShowInput] = useState(false);

  const tagContainerRef = useRef();
  const inputRef = useRef();

  const activeClasses = [
    "bg-indigo-400",
    "border",
    "border-indigo-400",
    "text-white",
  ];
  const inactiveClasses = [
    "bg-gray-300",
    "border",
    "border-gray-300",
    "text-gray-500",
  ];

  function getClasses(tag) {
    return selected.includes(tag) ? activeClasses : inactiveClasses;
  }

  function toggleInput(e) {
    e.preventDefault();

    setShowInput((val) => !val);
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (inputRef.current.value) {
      onSubmit(inputRef.current.value);
      setShowInput((val) => !val);
    }
  }

  return (
    <div className="tag-container h-[30px]" ref={tagContainerRef}>
      {tags.map((tag) => (
        <button key={tag} onClick={onSelect.bind(null, tag)}>
          <span className={`tag ${getClasses(tag).join(" ")}`}>{tag}</span>
        </button>
      ))}
      {showInput ? (
        ReactDOM.createPortal(
          <form className="new-tag" onSubmit={handleSubmit}>
            <input
              autoFocus
              className="border py-1 px-3 rounded text-sm"
              onBlur={toggleInput}
              ref={inputRef}
              type="text"
            />
          </form>,
          tagContainerRef.current
        )
      ) : (
        <button key="new-tag" onClick={toggleInput}>
          <span className="tag border">+ Add tag</span>
        </button>
      )}
    </div>
  );
}

function PostTags({ tags, withAll = false }) {
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

export default PostTags;
