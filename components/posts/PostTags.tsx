import Link from "next/link";
import ReactDOM from "react-dom";
import React, { useContext, useRef, useState } from "react";

import I18nContext from "../../store/i18n";

type PostTagSelectorProps = {
  tags: string[];
  selected: string[];
  onSelect: (tag: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit: (tag: string) => void;
};

export function PostTagSelector({
  tags,
  selected,
  onSelect,
  onSubmit,
}: PostTagSelectorProps) {
  const [showInput, setShowInput] = useState(false);

  const tagContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeClasses = ["bg-indigo-400", "border-indigo-400", "text-white"];
  const inactiveClasses = ["bg-gray-300", "border-gray-300", "text-gray-500"];

  function getClasses(tag: string) {
    return selected.includes(tag) ? activeClasses : inactiveClasses;
  }

  function toggleInput(
    e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    setShowInput((val) => !val);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (inputRef?.current?.value) {
      onSubmit(inputRef.current.value);
      setShowInput((val) => !val);
    }
  }

  return (
    <div className="tag-container min-h-[30px]" ref={tagContainerRef}>
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
              className="input"
              onBlur={toggleInput}
              ref={inputRef}
              type="text"
            />
          </form>,
          tagContainerRef.current!
        )
      ) : (
        <button key="new-tag" onClick={toggleInput}>
          <span className="tag">+ Add tag</span>
        </button>
      )}
    </div>
  );
}

function PostTags({
  tags,
  withAll = false,
}: {
  tags: string[];
  withAll?: boolean;
}) {
  const { t } = useContext(I18nContext);

  return (
    <div className="tag-container">
      {withAll && (
        <Link href={`/junkyard`} key="all">
          <a>
            <span className="tag bg-white border-blue-500 text-blue-500">
              {t.blogShowAll}...
            </span>
          </a>
        </Link>
      )}
      {tags.map((tag) => (
        <Link href={`/junkyard/s/${tag}`} key={tag}>
          <a>
            <span className="tag bg-blue-500 border-blue-500 text-white">
              {tag}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
}

export default PostTags;
